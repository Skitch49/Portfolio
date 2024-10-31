import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  constructor(private http: HttpClient) {}
  private backendUrl = `${environment.APIBackendUrl}/steam`;

  getUser(): Observable<any> {
    return this.http.get(`${this.backendUrl}/user`);
  }

  getUserGame(): Observable<any> {
    return this.http.get(`${this.backendUrl}/game`);
  }
}
