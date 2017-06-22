import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { click, Router, RouterStub, RouterLinkStubDirective } from '../../../../_testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debug: DebugElement;
  let linkDes: DebugElement[];
  let links: RouterLinkStubDirective[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, RouterLinkStubDirective ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers:    [ { provide: Router, useClass: RouterStub } ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
    });
  }));

  beforeEach(() => {
      fixture.detectChanges();
      linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      // get the attached link directive instances using the DebugElement injectors
      links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(1, 'should have 1 links');
    expect(links[0].linkParams).toBe('/', '1st link should go to HomePage');
  });

  it('should have a link to home page', () => {
    const linkDe = linkDes[0];
    const link = links[0];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/');
  });
});
