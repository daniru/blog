import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../models/blog';

@Injectable()
export class BlogFirebaseService {

  public get page(): number {
    return this._page;
  }

  public get pages(): number[] {
    return Array(Math.ceil(this._count / this._blogsByPage)).fill(null).map((x, i) => i + 1);
  }

  private _count: number;
  private _page: number;
  private _blogsByPage: number;

  private _localCache: Blog[] = [];
  private _blogSubject: Subject<Blog[]>;

  constructor(public afdb: AngularFireDatabase, public authService: AuthService) {
    this._page = 1;
    this._count = 0;
    this._blogsByPage = 6;

    this._blogSubject = new Subject<Blog[]>();
    this.afdb.list('/blog')
      .map((x: Blog[]) => { return x; })
      .do((x) => { this._localCache = x; })
      .do((x) => this._blogSubject.next(x))
      .subscribe();
  }

  // method to get all blogs
  getBlogs(): Observable<Blog[]> {
    const localObservable = Observable.of(this._localCache);
    return Observable.merge(localObservable, this._blogSubject.asObservable())
      .map((blogs) => {
        const partial = this.authService.user.isAdmin ? _.orderBy(blogs, (x) => x.date_created)
          : _.orderBy(_.filter(blogs, (x) => x.date_published && moment(x.date_published).isSameOrBefore(moment.utc())),
             (x) => x.date_published);
        this._count = partial.length;
        return partial.reverse().slice((this.page - 1) * this._blogsByPage, (this.page) * this._blogsByPage);
      });
  }

  // method to get on blog by key
  getBlog(key: string): Observable<Blog> {
    const blog = this._localCache.filter(x => x.key === key);
    const localObservable = Observable.of(blog);
    return Observable.merge(localObservable, this._blogSubject.asObservable())
      .map(res => { return res.find(x => x.key === key); });
  }

  refresh() {
    this._blogSubject.next(this._localCache);
  }

  setPage(num: number) {
    this._page = num;
    this._blogSubject.next(this._localCache);
  }

}
