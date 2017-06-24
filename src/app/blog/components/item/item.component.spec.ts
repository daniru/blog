import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ItemComponent } from './item.component';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../_testing/router-stubs';

const BlogServiceStub = {
  getBlogs: () => { },
  getBlog: () => { }
};

let activatedRoute: ActivatedRouteStub;
let component: ItemComponent;
let fixture: ComponentFixture<ItemComponent>;
let blogService: BlogService;
let spy: jasmine.Spy;
let debug: DebugElement;

describe('Blog Module', () => {

  describe('Item Component', () => {

    describe('initial Test', () => {

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ RouterTestingModule ],
          declarations: [ ItemComponent ],
          schemas: [ NO_ERRORS_SCHEMA ],
          providers: [ { provide: BlogService, useValue: BlogServiceStub } ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ItemComponent);
          component = fixture.componentInstance;
          blogService = fixture.debugElement.injector.get(BlogService);
          spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of({ title: 'myblog' }));
        });
      }));

      it('should be created', () => {
        expect(component).toBeTruthy();
      });

      it('should not show blog before OnInit', () => {
        expect(component.blog).toBeUndefined();
        expect(spy.calls.any()).toBe(false, 'getBlog not yet called');
      });

    });

    describe('with route param and service response', () => {

      beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = { 'key': 20 };
      });

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ RouterTestingModule ],
          declarations: [ ItemComponent ],
          schemas: [ NO_ERRORS_SCHEMA ],
          providers: [
            { provide: BlogService, useValue: BlogServiceStub },
            { provide: ActivatedRoute, useValue: activatedRoute }
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ItemComponent);
          component = fixture.componentInstance;
          blogService = fixture.debugElement.injector.get(BlogService);
          spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of({ title: 'myblog', sections: [{}, {}, {}] }));
          debug = fixture.debugElement;
        });
      }));

      it('should request the blog and display title', () => {
        fixture.detectChanges();
        expect(component.blog).toBeDefined();
        expect(spy.calls.any()).toBe(true, 'getBlog called');
        expect(component.blog.title).toBe('myblog');
      });

      it('should request the blog and display three sections', () => {
        fixture.detectChanges();
        expect(component.blog).toBeDefined();
        expect(spy.calls.any()).toBe(true, 'getBlog called');
        expect(component.blog.sections.length).toBe(3);

        const elements = fixture.debugElement.queryAll(By.css('dr-item-section'));
        expect(elements.length).toBe(3);
      });

      it('should request the blog and display comments section', () => {
        fixture.detectChanges();
        expect(component.blog).toBeDefined();
        expect(spy.calls.any()).toBe(true, 'getBlog called');
        expect(component.blog.sections.length).toBe(3);

        const elements = fixture.debugElement.queryAll(By.css('dr-item-comments'));
        expect(elements.length).toBe(1);
      });

    });

    describe('with route param and null response', () => {

      beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = { 'key': 20 };
      });

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ RouterTestingModule ],
          declarations: [ ItemComponent ],
          schemas: [ NO_ERRORS_SCHEMA ],
          providers: [
            { provide: BlogService, useValue: BlogServiceStub },
            { provide: ActivatedRoute, useValue: activatedRoute },
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ItemComponent);
          component = fixture.componentInstance;
          blogService = fixture.debugElement.injector.get(BlogService);
          spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of(undefined));
          debug = fixture.debugElement;
        });
      }));

      it('should request the blog and display nothing', () => {
        fixture.detectChanges();
        expect(component.blog).toBeUndefined();
        expect(spy.calls.any()).toBe(true, 'getBlog called');
      });

    });


  });

});
