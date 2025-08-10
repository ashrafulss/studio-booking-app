import { Component } from '@angular/core';
import { StudioService } from '../../services/studio.service';
import { Studio } from '../../model/Studio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studio-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.css'
})
export class StudioListComponent {



  searchTerm: string = '';
  studios: Studio[] = [];
  filteredStudios: Studio[] = [];
  pagedStudios: Studio[] = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;

  uniqueAreas: string[] = [];
  uniqueTypes: string[] = [];

  selectedAreas: Set<string> = new Set();
  showFilters = false;

  suggestions: string[] = [];
  showSuggestions: boolean = false;

  constructor(private studioService: StudioService) { }

  ngOnInit(): void {
    this.loadStudios();
  }

  loadStudios(): void {
    this.studioService.getStudios().subscribe({
      next: (data) => {
        this.studios = data;
        this.filteredStudios = data;
        this.extractUniqueFilters();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching studios:', err);
      }
    });
  }

  extractUniqueFilters(): void {
    const areas = new Set<string>();
    const types = new Set<string>();
    this.studios.forEach(s => {
      areas.add(s.Location.Area);
      types.add(s.Type);
    });
    this.uniqueAreas = Array.from(areas);
    this.uniqueTypes = Array.from(types);
  }

  onSearchInputChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    // Suggestions from areas and types matching the term
    const areaMatches = this.uniqueAreas.filter(a => a.toLowerCase().includes(term));
    const typeMatches = this.uniqueTypes.filter(t => t.toLowerCase().includes(term));

    // Merge and remove duplicates
    this.suggestions = Array.from(new Set([...areaMatches, ...typeMatches]));
    this.showSuggestions = this.suggestions.length > 0;
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.onSearchClick();
  }

  onSearchClick(): void {
    this.showFilters = true;
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredStudios = this.studios;
    } else {
      this.filteredStudios = this.studios.filter(s =>
        s.Location.Area.toLowerCase().includes(term) ||
        s.Type.toLowerCase().includes(term)
      );
    }
    this.selectedAreas.clear();
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudios.length / this.pageSize);
    this.currentPage = 1;
    this.setPagedStudios();
  }

  setPagedStudios(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedStudios = this.filteredStudios.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPagedStudios();
  }

  bookStudio(studio: Studio) {
    alert(`Booking requested for: ${studio.Name}`);
  }




  radiusOptions = [5, 10, 20]; // in kilometers
  selectedRadius = 10; // default radius

  userLocation: { latitude: number; longitude: number } | null = null;
  locationError: string | null = null;
  radiusSearchResults: Studio[] = [];

  searchByRadius(): void {
    this.locationError = null;

    if (!navigator.geolocation) {
      this.locationError = 'Geolocation is not supported by your browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.filterStudiosByRadius();
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.locationError = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            this.locationError = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            this.locationError = 'Location request timed out.';
            break;
          default:
            this.locationError = 'An unknown error occurred.';
            break;
        }
      }
    );
  }

  filterStudiosByRadius(): void {
    if (!this.userLocation) return;

    this.radiusSearchResults = this.studios.filter(studio => {
      const dist = this.getDistanceFromLatLonInKm(
        this.userLocation!.latitude,
        this.userLocation!.longitude,
        studio.Location.Coordinates.Latitude,
        studio.Location.Coordinates.Longitude
      );
      return dist <= this.selectedRadius;
    });

    if (this.radiusSearchResults.length === 0) {
      this.locationError = `No studios found within ${this.selectedRadius} km radius.`;
    } else {
      this.locationError = null;
    }

    this.filteredStudios = this.radiusSearchResults;
    this.updatePagination();
  }

  /** Haversine formula to calculate distance between two lat/lng points in km */
  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

}
