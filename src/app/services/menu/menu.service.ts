import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private basePath = 'http://localhost:3000/products';

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
      token: this.tokenStorageService.getToken(),
    }),
  };

  save = (category: {
    name: string;
    short_name: string;
    price: number;
    idCategory: number;
  }): Observable<Menu> => {
    return this.http.post<Menu>(`${this.basePath}/`, category, this.headers);
  };

  edit = (category: {
    id: number;
    name: string;
    short_name: string;
    price: number;
    idCategory: number;
  }): Observable<Menu> => {
    return this.http.patch<Menu>(
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
    return this.http.get<{ totalData: number; data: Menu[] }>(
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

  get_one = (id) => {
    return this.http.get<Menu>(`${this.basePath}/${id}`, {
      ...this.headers,
    });
  };
}
