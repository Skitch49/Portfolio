import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private backendUrl = `${environment.APIBackendUrl}/spotify`;

  constructor(private http: HttpClient) {}

  getTopTracks(timeRange: string = 'medium_term', limit: number = 20, type: string = 'tracks'): Observable<any> {
    return this.http.get(`${this.backendUrl}/top`, {
      params: { time_range: timeRange, limit: limit.toString(), type },
    });
  }

  getCurrentlyPlayingTrack(): Observable<any> {
    return this.http.get(`${this.backendUrl}/current-track`);
  }
  
}
