import { ButtonClickEvents } from './../../../_testing/index';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipboardDirective } from './clipboard.directive';
import { By } from '@angular/platform-browser';
import { click } from '../../../_testing/index';

describe('ClipboardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClipboardDirective, TestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(ClipboardDirective));
    fixture.detectChanges();
  });

  it ('should be created component with directice', () => {
    expect(component).toBeDefined('component to be defined');
    expect(directive).toBeDefined('directive to be defined')
  });

  it ('should show button when mouse is over', () => {
    const buttons = directive.nativeElement.getElementsByTagName('button');
    expect(buttons.length).toBe(0, 'button not created yet');

    directive.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    let button = directive.nativeElement.getElementsByClassName('hiddenbutton')[0];
    expect(button).toBeUndefined('button with hiddenbutton should be indefined');
    button = directive.nativeElement.getElementsByTagName('button')[0];
    expect(button).not.toBeNull('button should exist');
  });

  it ('should hide button when mouse is out', () => {
    directive.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    directive.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    const button = directive.nativeElement.getElementsByClassName('hiddenbutton')[0];
    expect(button).not.toBeNull('button should be hidden after mouse leave');
  });

  it ('should show button again when mouse is over', () => {

    directive.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    directive.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    directive.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    const buttons = directive.nativeElement.getElementsByTagName('button');
    expect(buttons.length).toBe(1, 'should reuse the same button, no create another');
  });

  it ('should copy text to the clipboard when click on button', () => {
    const nobutton = directive.query(By.css('button'));
    expect(nobutton).toBeNull('button not created yet');

    directive.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    let button = directive.nativeElement.getElementsByClassName('hiddenbutton')[0];
    expect(button).toBeUndefined('button with hiddenbutton should be indefined');
    button = directive.nativeElement.getElementsByTagName('button')[0];
    expect(button).not.toBeNull('button should exist');

    click(button);
    // how to test the clipboard ??
  });
});

@Component({
  selector: 'dr-test',
  template: `<div drClipboard [text]="'yellow'"></div>`
})
class TestComponent {
  hola = 'adios';
}
