import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithTableComponent } from './page-with-table.component';

describe('PageWithTableComponent', () => {
  let component: PageWithTableComponent;
  let fixture: ComponentFixture<PageWithTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWithTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
