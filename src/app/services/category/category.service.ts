import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private basePath = 'http://localhost:3000/categories';

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
      token: this.tokenStorageService.getToken(),
    }),
  };

  save = (category: Category): Observable<Category> => {
    return this.http.post<Category>(
      `${this.basePath}/`,
      category,
      this.headers
    );
  };
}
