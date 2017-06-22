import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ItemSectionComponent } from './item-section.component';

let component: ItemSectionComponent;
let fixture: ComponentFixture<ItemSectionComponent>;
let debug: DebugElement;

@Pipe({ name: 'markdown', pure: false })
export class MockedPipe implements PipeTransform {
    name = 'date';
    transform(query: string, ...args: any[]): any { return query; }
}

describe('ItemSectionComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSectionComponent, MockedPipe ],
      imports: [  ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ItemSectionComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
    });
  }));

  it('should be created if text provided', () => {
    expect(component).toBeTruthy();
  });

  it('should not show anything', () => {
    component.section = { text: null, files: null, order: 1 };
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const text = debug.queryAll(By.css('#wrapper'));
    expect(text.length).toBe(0);
    const files = debug.queryAll(By.css('dr-item-files'));
    expect(files.length).toBe(0);
  });

  it('should be created if text provided', () => {
    component.section = { text: 'hola', files: null, order: 1 };
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const text = debug.queryAll(By.css('#wrapper'));
    expect(text.length).toBe(1);
    const files = debug.queryAll(By.css('dr-item-files'));
    expect(files.length).toBe(0);
  });

  it('should be created if files provided', () => {
    component.section = { text: null, files: [<any>{}, <any>{}], order: 1 };
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const text = debug.queryAll(By.css('#wrapper'));
    expect(text.length).toBe(0);
    const files = debug.queryAll(By.css('dr-item-files'));
    expect(files.length).toBe(1);
  });
});
