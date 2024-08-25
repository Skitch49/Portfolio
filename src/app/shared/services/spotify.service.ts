// src/app/shared/services/spotify.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTopTracks(timeRange: string, limit: number, type: string): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      return throwError('No access token available');
    }
    return this.http.get(
      `${this.apiUrl}/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    ).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token is expired or invalid
          this.authService.login(); // Redirect to login if token is invalid
        }
        return throwError(err);
      })
    );
  }

  getCurrentlyPlayingTrack(): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      return throwError('No access token available');
    }
    return this.http.get(`${this.apiUrl}/me/player/currently-playing`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token is expired or invalid
          this.authService.login(); // Redirect to login if token is invalid
        }
        return throwError(err);
      })
    );
  }
}
