import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ItemFilesComponent } from './item-files.component';
import { File } from './../../models/file';

let component: ItemFilesComponent;
let fixture: ComponentFixture<ItemFilesComponent>;
let debug: DebugElement;

@Pipe({ name: 'prettyfile', pure: false })
export class MockedPipe implements PipeTransform {
    name = 'date';
    transform(query: string, ...args: any[]): any { return query; }
}

describe('ItemFilesComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFilesComponent, MockedPipe ],
      imports: [  ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ItemFilesComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
    });
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get correct class', () => {
    const file: File = { name: 'dani.html', path: '', content: '', order: 1 }
    expect(component.getClass(file)).toBe('file lang-html');
  });

  it('should get empty class when no file', () => {
    const file: File = { name: '', path: '', content: '', order: 1 }
    expect(component.getClass(file)).toBe('');
  });

});
