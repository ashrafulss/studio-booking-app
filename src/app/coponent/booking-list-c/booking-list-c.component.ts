import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Studio } from '../../model/Studio';
import { StudioService } from '../../services/studio.service';

@Component({
  selector: 'app-booking-list-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list-c.component.html',
  styleUrl: './booking-list-c.component.css'
})
export class BookingListCComponent {


  bookings: any[] = [];
  studios: Studio[] = [];

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.loadStudios();
    this.loadBookings();
  }

  loadStudios(): void {
    this.studioService.getStudios().subscribe({
      next: (data) => {
        this.studios = data;
      },
      error: (err) => {
        console.error('Error loading studios:', err);
      },
    });
  }

  loadBookings(): void {
    const bookingsJson = localStorage.getItem('studioBookings');
    this.bookings = bookingsJson ? JSON.parse(bookingsJson) : [];
  }

  getStudioById(id: number): Studio | undefined {
    return this.studios.find((studio) => studio.Id === id);
  }
}
