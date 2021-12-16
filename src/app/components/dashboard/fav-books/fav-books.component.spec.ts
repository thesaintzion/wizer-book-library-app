import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBooksComponent } from './fav-books.component';

describe('FavBooksComponent', () => {
  let component: FavBooksComponent;
  let fixture: ComponentFixture<FavBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
