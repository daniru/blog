import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';
import { ListItemComponent} from '../list-item/list-item.component';
import { BlogService } from '../../services/blog.service';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let blogService: BlogService;
  let spy: jasmine.Spy;
  let debug: DebugElement;  // the DebugElement with the welcome message

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, ListItemComponent ],
      imports: [ RouterTestingModule ],
      providers: [ BlogService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    blogService = fixture.debugElement.injector.get(BlogService);
    spy = spyOn(blogService, 'getBlogs').and.returnValue(Observable.of([{}, {}]));
    debug = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not show blogs before OnInit', () => {
    expect(component.list).toBeUndefined();
    expect(spy.calls.any()).toBe(false, 'getBlogs not yet called');
  });

  it('should contain two blogs in the list after component initialized', () => {
    fixture.detectChanges();
    expect(component.list).toBeDefined();
    expect(spy.calls.any()).toBe(true, 'getBlogs called');
    const elements = fixture.debugElement.queryAll(By.css('dr-list-item'));
    expect(elements.length).toBe(2);
  });

});
