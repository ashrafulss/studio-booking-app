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
  pagedBookings: any[] = [];
  currentPage = 1;
  pageSize = 3;  // bookings per page
  totalPages = 0;

  constructor(private studioService: StudioService) { }

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

 

  getStudioById(id: number): Studio | undefined {
    return this.studios.find((studio) => studio.Id === id);
  }


loadBookings() {
  const bookingsJson = localStorage.getItem('studioBookings');
  this.bookings = bookingsJson ? JSON.parse(bookingsJson) : [];
  this.bookings.reverse();
  this.updatePagination();
}



updatePagination() {
  this.totalPages = Math.ceil(this.bookings.length / this.pageSize);
  this.currentPage = 1;
  this.setPagedBookings();
}

setPagedBookings() {
  const start = (this.currentPage - 1) * this.pageSize;
  this.pagedBookings = this.bookings.slice(start, start + this.pageSize);
}

goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.setPagedBookings();
}
}
