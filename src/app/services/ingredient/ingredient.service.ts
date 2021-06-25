import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { TokenStorageService } from '../auth/token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private basePath = 'http://localhost:3000/ingredients';

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
      token: this.tokenStorageService.getToken(),
    }),
  };

  save = (ingredient: Ingredient): Observable<Ingredient> => {
    return this.http.post<Ingredient>(
      `${this.basePath}/`,
      ingredient,
      this.headers
    );
  };
}
