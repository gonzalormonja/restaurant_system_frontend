import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../../interfaces/session';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private tokenStorageService: TokenStorageService
  ) {}

  private basePath = 'http://localhost:3000/users';

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
    }),
  };

  login = (username: string, password: string): Observable<Session> => {
    return this.http.post<Session>(
      `${this.basePath}/signIn`,
      {
        username,
        password,
      },
      this.headers
    );
  };

  isAuthenticated = (): boolean => {
    const token = this.tokenStorageService.getToken();
    if (token) {
      return this.jwtHelper.isTokenExpired();
    }
    return false;
  };
}
