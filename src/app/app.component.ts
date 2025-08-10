import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudioListComponent } from "./coponent/studio-list/studio-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StudioListComponent, RouterLink]
})
export class AppComponent {
  title = 'bookingApp';
}
