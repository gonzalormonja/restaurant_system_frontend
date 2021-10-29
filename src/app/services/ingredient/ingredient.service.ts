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

  private options = [
    { name: 'Peso (kg, g, mg)', id: 'weight' },
    { name: 'Litro (l, ml)', id: 'liter' },
    { name: 'Logintud (m, cm, mm)', id: 'length' },
    { name: 'Unidad', id: 'unit' },
  ];

  private headers = {
    headers: new HttpHeaders({
      tz: '-03:00',
      token: this.tokenStorageService.getToken(),
    }),
  };

  get_options = () => {
    return this.options;
  };

  save = (ingredient: Ingredient): Observable<Ingredient> => {
    console.log(ingredient);
    return this.http.post<Ingredient>(
      `${this.basePath}/`,
      ingredient,
      this.headers
    );
  };

  edit = (ingredient: Ingredient): Observable<Ingredient> => {
    return this.http.patch<Ingredient>(
      `${this.basePath}/${ingredient.id}`,
      ingredient,
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
    return this.http.get<{ totalData: number; data: Ingredient[] }>(
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

  get_name_unit_of_measure = (id) => {
    return this.options.filter((opt) => opt.id === id)[0]?.name;
  };
}
