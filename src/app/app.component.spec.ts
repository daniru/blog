import { HeaderComponent } from './shared/components/header/header.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it ('can instanciate it', () => {
    expect(component).not.toBeNull();
  });

  it('should contain header element', async(() => {
    const header = fixture.debugElement.queryAll(By.css('dr-header'));
    expect(header.length).toBe(1);
  }));

  it('should contain reouter outlet', async(() => {
    const header = fixture.debugElement.queryAll(By.css('router-outlet'));
    expect(header.length).toBe(1);
  }));
});
