// src/app/shared/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '03f454e1182f4722960becdc0e895b9c';
  private redirectUri = 'https://alexis-delaunay.fr/presentation/music';
  private scopes = 'user-top-read user-read-currently-playing';

  constructor(private router: Router) {}

  login() {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scopes)}`;
    window.location.href = authUrl;
  }

  handleAuthCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in'); // Get the expiration time from URL parameters
  
    if (token && expiresIn) {
      localStorage.setItem('spotify_access_token', token);
      const expirationTime = Date.now() + (parseInt(expiresIn) * 1000); // Convert seconds to milliseconds
      localStorage.setItem('spotify_token_expiration', expirationTime.toString());
  
      // Redirection vers la page désirée après authentification
      this.router.navigate(['/presentation/music']);
    } else {
      console.error('Aucun token ou temps d\'expiration trouvé !');
    }
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem('spotify_access_token');
    const expirationTime = localStorage.getItem('spotify_token_expiration');
    
    if (token && expirationTime) {
      if (Date.now() > parseInt(expirationTime)) {
        // Token expired, force re-authentication
        this.login();
        return null;
      }
      return token;
    } else {
      // No token or expiration time found, re-authenticate
      this.login();
      return null;
    }
  }
}
