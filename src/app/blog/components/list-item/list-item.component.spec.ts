import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { click, Router, RouterStub, RouterLinkStubDirective } from '../../../../_testing';
import { ListItemComponent } from './list-item.component';

let component: ListItemComponent;
let fixture: ComponentFixture<ListItemComponent>;
let debug: DebugElement;

describe('ListItemComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent, RouterLinkStubDirective ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ListItemComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.blog = <any>{ key: '1', title: 'title', date_created: null, date_published: null,
        sections: [ { text: 'pp', order: 2}, { text: 'popo', order: 1 } ], header: '' };
    component.ngOnChanges({});
    fixture.detectChanges();
  });

  it('should select only the first first section', () => {
    expect(component.firstSection.text).toBe('popo');
  });

  it('should contain one header, section and button', () => {
    const header = debug.queryAll(By.css('dr-item-header'));
    const sections = debug.queryAll(By.css('dr-item-header'));
    const buttons = debug.queryAll(By.css('button'));
    expect(header.length).toBe(1, 'contains header');
    expect(sections.length).toBe(1, 'contains one section');
    expect(buttons.length).toBe(1, 'contains one button');
  });

  it('should button redirect to item', () => {
    const linkDes = debug.queryAll(By.directive(RouterLinkStubDirective));
    const links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    expect(links.length).toBe(1);

    const link = links[0];
    expect(link.linkParams).toBe('1');

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDes[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('1');
  });

});
