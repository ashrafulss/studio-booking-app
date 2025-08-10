import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListCComponent } from './booking-list-c.component';

describe('BookingListCComponent', () => {
  let component: BookingListCComponent;
  let fixture: ComponentFixture<BookingListCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingListCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingListCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
