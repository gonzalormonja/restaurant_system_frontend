import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    localStorage.clear();
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
