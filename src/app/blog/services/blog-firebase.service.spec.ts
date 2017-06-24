import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TestBed, inject, fakeAsync, } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BlogFirebaseService } from './blog-firebase.service';

const _createResponse = (body) => {
    const options = new ResponseOptions({ body: JSON.stringify(body)});
    return new Response(options);
}

const angularFireDatabaseStub = {
  subject: new Subject<any[]>(),
  list: (x: any[]) => this.subject
};

const authServiceStub = {
  user: {}
};

describe('BlogService', () => {

  xit('should be able to be created and load cache with no data', () => {
    const body = [{ date_published: new Date() }];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const serv = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
  });

  xit('should return list of blogs', () => {
    const body = [{ date_published: new Date() }, { date_published: new Date() }];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    service.getBlogs().subscribe((blogs) => {
      expect(blogs.length).toBe(2);
    });
  });

  xit('should not find any blog with no data', () => {
    const body = [];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    service.getBlog('b').subscribe((blog) => {
      expect(blog).toBeUndefined();
    });
  });

  xit('should not find any blog', () => {
    const body = [{ key: 'a' }];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    service.getBlog('b').subscribe((blog) => {
      expect(blog).toBeUndefined();
    });
  });

  xit('should find a blog', () => {
    const body = [{ key: 'a' }];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    service.getBlog('a').subscribe((blog) => {
      expect(blog).toBeDefined();
      expect(blog.key).toBe('a');
    });
  });

  xit('should have first page by default', () => {
    const body = [{}, {}, {}, {}, {}];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    expect(service.page).toBe(1);
  });

  xit('should change pages', () => {
    const body = [{}, {}, {}, {}, {}];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    expect(service.page).toBe(1);
    service.setPage(2);
    expect(service.page).toBe(2);
  });

  it('should return array with number of pages', () => {
    const body = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const spy = spyOn(angularFireDatabaseStub, 'list').and.returnValue(Observable.of(body));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    angularFireDatabaseStub.subject.next(body);
    expect(service.pages.length).toBe(3);
    service.setPage(2);
    expect(service.page).toBe(2);
  });

  xit('should emit value when refresh is called', () => {
    const body = { blog: [{}, {}, {}] };
    const options = new ResponseOptions({ body: JSON.stringify(body)});
    const response = new Response(options);
    const spy = spyOn(httpSub, 'get').and.returnValue(Observable.of(response));
    const service = new BlogFirebaseService(<any>angularFireDatabaseStub, <any>authServiceStub);
    const sub = service.getBlogs().subscribe((x) => {
      expect(x.length).toBe(2);
    });
    sub.unsubscribe();
    service.setPage(2);
    const sub2 = service.getBlogs().subscribe((x) => {
      expect(x.length).toBe(1);
    });
    service.refresh();
    sub2.unsubscribe();
  });

});
