import { Observable } from 'rxjs/Observable';
import { TestBed, inject, fakeAsync, } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { BlogService } from './blog.service';

describe('BlogService', () => {

  it('should be able to be created', () => {
    const serv = new BlogService();
  });

  it('should be able to be created', () => {
    const service = new BlogService();
    service.getBlogs().subscribe((blogs) => {
      expect(blogs.length).toBe(2);
    });
  });

  it('should be able to return one value', () => {
    const service = new BlogService();
    service.getBlog('blog_2').subscribe((blog) => {
      expect(blog.key).toBe('blog_2');
    });
  });

});
