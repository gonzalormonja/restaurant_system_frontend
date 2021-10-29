import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { Ingredient } from 'src/app/interfaces/ingredient';

// TODO: Replace this with your own data model type
/**
 * Data source for the MenuTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class IngredientTableDataSource extends DataSource<Ingredient> {
  data: Ingredient[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private ingredientSubject = new BehaviorSubject<Ingredient[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalData: number = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private ingredientService: IngredientService) {
    super();
  }

  connect(): Observable<Ingredient[]> {
    return this.ingredientSubject.asObservable();
  }
  disconnect(): void {
    this.ingredientSubject.complete();
    this.loadingSubject.complete();
  }

  getTotalData = () => {
    return this.totalData;
  };

  loadData = (
    search = '',
    columnOrder = 'id',
    order = 'desc',
    pageNumber = 0,
    pageSize = 10
  ) => {
    this.loadingSubject.next(true);
    this.ingredientService
      .get(search, columnOrder, order, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: { totalData: number; data: Ingredient[] }) => {
        this.totalData = resp.totalData;
        this.ingredientSubject.next(resp.data);
      });
  };
  addRow = (row: Ingredient) => {
    this.ingredientSubject.next([row, ...this.ingredientSubject.value]);
  };
  modifyRow = (row: Ingredient) => {
    this.ingredientSubject.next([
      row,
      ...this.ingredientSubject.value.filter(
        (ingredient) => ingredient.id !== row.id
      ),
    ]);
  };
  deleteRow = (id: number) => {
    this.ingredientSubject.next(
      this.ingredientSubject.value.filter((ingredient) => ingredient.id !== id)
    );
  };
}
