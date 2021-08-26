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

  save = (category: {
    name: string;
    idCategory: number;
  }): Observable<Category> => {
    return this.http.post<Category>(
      `${this.basePath}/`,
      category,
      this.headers
    );
  };

  edit = (category: {
    id: number;
    name: string;
    idCategory: number;
  }): Observable<Category> => {
    return this.http.put<Category>(
      `${this.basePath}/${category.id}`,
      category,
      this.headers
    );
  };

  delete = (id: number): Observable<boolean> => {
    return this.http.delete<boolean>(`${this.basePath}/${id}`, this.headers);
  };

  get = (
    search = '',
    columnOrder = 'id',
    order = 'desc',
    pageNumber = 0,
    pageSize = 10
  ) => {
    return this.http.get<{ totalData: number; data: Category[] }>(
      `${this.basePath}/`,
      {
        ...this.headers,
        params: {
          search: search,
          columnOrder: columnOrder,
          order: order,
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      }
    );
  };
}
