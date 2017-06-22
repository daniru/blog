import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

let component: PaginationComponent;
let fixture: ComponentFixture<PaginationComponent>;

describe('PaginationComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PaginationComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    component.page = 1;
    component.pages = [1, 2, 3];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should change page', (done) => {
    expect(component.page).toBe(1);
    component.pageChange.subscribe((x) => {
      expect(x).toBe(2);
      done();
    });
    component.setPage(2);
  });

  it('should render 5 buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(5);
  });
});
