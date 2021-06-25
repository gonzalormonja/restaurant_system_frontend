import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Characteristic } from 'src/app/characteristic';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CharacteristicService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private basePath = 'http://localhost:3000/characteristics';

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
      token: this.tokenStorageService.getToken(),
    }),
  };

  save = (characteristic: Characteristic): Observable<Characteristic> => {
    return this.http.post<Characteristic>(
      `${this.basePath}/`,
      characteristic,
      this.headers
    );
  };
}
