import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Blog } from '../models/blog';
import 'rxjs/Rx';

@Injectable()
export class BlogService {

  // we keep the blogs in memory
  public blog: Subject<Blog[]>;
  private _blogs: Blog[];

  // We populate the mock data in the constructor
  constructor() {
    this.blog = new Subject<Blog[]>();
    this._blogs = [
      { key: 'blog_1', title: 'Blog 1' },
      { key: 'blog_2', title: 'Blog 2' }
    ];
  }

  // method to get all blogs
  getBlogs(): Observable<Blog[]> {
    return Observable.of(this._blogs);
  }

  // method to get on blog by key
  getBlog(key: string): Observable<Blog> {
    return Observable.of(this._blogs.find(x => x.key === key));
  }
}
