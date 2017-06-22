import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { ItemComponent } from './item.component';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../_testing/router-stubs';

describe('ItemComponent', () => {
  let activatedRoute: ActivatedRouteStub;
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let blogService: BlogService;
  let spy: jasmine.Spy;
  let debug: DebugElement;

  describe('ItemComponent Init Test', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ ItemComponent ],
        providers: [ BlogService ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      blogService = fixture.debugElement.injector.get(BlogService);
      spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of({ title: 'myblog' }));
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not show blog before OnInit', () => {
      expect(component.blog).toBeUndefined();
      expect(spy.calls.any()).toBe(false, 'getBlog not yet called');
    });

  });

  describe('ItemComponent with route param and service response', () => {

    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      activatedRoute.testParams = { 'key': 20 };
    });

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ ItemComponent ],
        providers: [
          BlogService,
          { provide: ActivatedRoute, useValue: activatedRoute },
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      blogService = fixture.debugElement.injector.get(BlogService);
      spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of({ title: 'myblog' }));
      debug = fixture.debugElement;
    });

    it('should request the blog and display title', () => {
      fixture.detectChanges();
      expect(component.blog).toBeDefined();
      expect(spy.calls.any()).toBe(true, 'getBlog called');
      expect(component.blog.title).toBe('myblog');
    });

  });

  describe('ItemComponent with route param and null response', () => {

    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      activatedRoute.testParams = { 'key': 20 };
    });

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ ItemComponent ],
        providers: [
          BlogService,
          { provide: ActivatedRoute, useValue: activatedRoute },
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      blogService = fixture.debugElement.injector.get(BlogService);
      spy = spyOn(blogService, 'getBlog').and.returnValue(Observable.of(undefined));
      debug = fixture.debugElement;
    });

    it('should request the blog and display nothing', () => {
      fixture.detectChanges();
      expect(component.blog).toBeUndefined();
      expect(spy.calls.any()).toBe(true, 'getBlog called');
    });

  });


});
