import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Studio } from '../model/Studio';

@Injectable({
  providedIn: 'root'
})
export class StudioService {




// private apiUrl = '/assets/studio-mock-api.json';
private apiUrl = 'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json';

  constructor(private http: HttpClient) {}

  getStudios(): Observable<Studio[]> {
  return this.http.get<{ Studios: Studio[] }>(this.apiUrl).pipe(
    map(response => response.Studios)
  );
}


}
