import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ItemHeaderComponent } from './item-header.component';

let component: ItemHeaderComponent;
let fixture: ComponentFixture<ItemHeaderComponent>;
let debug: DebugElement;

describe('ItemHeaderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeaderComponent ],
      imports: [  ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ItemHeaderComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should populate links', () => {
    component.blog = <any>{ title: 'hi', sections: [], key: 'hi'}
    component.ngOnChanges();
    expect(component.socialLinks.length).toBe(5)
  });
});
