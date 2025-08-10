import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudioListComponent } from "./coponent/studio-list/studio-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, StudioListComponent, RouterLink, CommonModule]
})
export class AppComponent {
  title = 'bookingApp';



  userName = 'John Doe';  // example, get from your auth service
  userInitials = this.getInitials(this.userName);

  isProfileMenuOpen = false;

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu() {
    // Close menu when focus is lost
    this.isProfileMenuOpen = false;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  logout() {
    // Implement your logout logic here
    console.log('Logout clicked');
  }

}
