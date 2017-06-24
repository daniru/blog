import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Blog } from '../models/blog';

@Injectable()
export class BlogService {

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

  // Initialize subject and request JSON file to store in the localCache.
  constructor(private http: Http) {

    this._page = 1;
    this._count = 0;
    this._blogsByPage = 2;

    this._blogSubject = new Subject<Blog[]>();
    this.http
      .get('./assets/data/data.json')
      .map((res) => {
        return this._convertObjectToArray(res.json().blog);
       })
      .do((x) => {
        this._count = x.length;
        this._localCache = x;
        this._blogSubject.next(x);
      })
      .subscribe();
  }

  // Get blogs from the localCache or the observable
  getBlogs(): Observable<Blog[]> {
    return Observable.of(this._localCache)
      .merge(this._blogSubject.asObservable())
      .map((res) => {
        this._count = res.length;
        return res.reverse().slice((this._page - 1) * this._blogsByPage, (this._page) * this._blogsByPage);
      });
  }

  // Get blog from the localCache or the observable
  getBlog(key: string): Observable<Blog> {
    const blog = this._localCache.filter(x => x.key === key);
    const localObservable = Observable.of(blog);
    return Observable
      .merge(localObservable, this._blogSubject.asObservable())
      .map(res => { return res && res.length === 0 ? null : res.find(x => x.key === key); });
  }

  setPage(num: number) {
    this._page = num;
    this._blogSubject.next(this._localCache);
  }

  refresh() {
    this._blogSubject.next(this._localCache);
  }

  // Convert object to array function

  private _convertObjectToArray(data: any): Blog[] {
    return Object.keys(data).map((key: string) => {
      return <Blog>data[key];
    });
  }
}