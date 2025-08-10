import { Routes } from '@angular/router';
import { StudioListComponent } from './coponent/studio-list/studio-list.component';
import { BookingListCComponent } from './coponent/booking-list-c/booking-list-c.component';


export const routes: Routes = [
  { path: '', component: StudioListComponent },
  { path: 'bookings', component: BookingListCComponent },
];