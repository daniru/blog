import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { BehaviorSubject, } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Rx';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';
import { ListItemComponent} from '../list-item/list-item.component';
import { BlogService } from '../../services/blog.service';

let component: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let blogService: BlogService;
let spy: jasmine.Spy;
let debug: DebugElement;  // the DebugElement with the welcome message

const BlogServiceStub = {
    getBlogs: () => { return Observable.of([{}, {}]); },
    getBlog: () => { return Observable.of(); },
    setPage: () => {},
    refresh: () => {},
    pages: [1, 2]
};

const AuthServiceStub = {
  userSubject: new Subject<User>()
};

describe('ListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: BlogService, useValue: BlogServiceStub },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    })
    .compileComponents()
    .then(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        blogService = fixture.debugElement.injector.get(BlogService);
        debug = fixture.debugElement;
    });
  }));

  beforeEach(() => {
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not show blogs before OnInit', () => {
    spy = spyOn(blogService, 'getBlogs').and.returnValue(Observable.of([]));
    expect(component.list).toBeUndefined();
    expect(spy.calls.any()).toBe(false, 'getBlogs not yet called');
  });

  it('should contain two blogs in the list after component initialized', () => {
    spy = spyOn(blogService, 'getBlogs').and.returnValue(Observable.of([{}, {}]));
    fixture.detectChanges();
    expect(component.list).toBeDefined();
    expect(spy.calls.any()).toBe(true, 'getBlogs called');
    const elements = fixture.debugElement.queryAll(By.css('dr-list-item'));
    expect(elements.length).toBe(2);
  });

  it('should call blog service to update the page', () => {
    spy = spyOn(blogService, 'setPage').and.callThrough();
    component.updatePage(2);
    expect(spy.calls.any()).toBe(true, 'getBlogs called');
    expect(spy.calls.first().args.length).toBe(1);
    expect(spy.calls.first().args[0]).toBe(2)
  });

  it('should refresh when use changes', () => {
    spy = spyOn(blogService, 'refresh').and.callThrough();
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(false, 'should not be called');
    AuthServiceStub.userSubject.next(<any>{});
    expect(spy.calls.any()).toBe(true, 'Refresh should be called');
  });

});
