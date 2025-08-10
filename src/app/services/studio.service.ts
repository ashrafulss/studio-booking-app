import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Studio } from '../model/Studio';

@Injectable({
  providedIn: 'root'
})
export class StudioService {




private apiUrl = '/assets/studio-mock-api.json';


  constructor(private http: HttpClient) {}

  getStudios(): Observable<Studio[]> {
  return this.http.get<{ Studios: Studio[] }>(this.apiUrl).pipe(
    map(response => response.Studios)
  );
}


}
