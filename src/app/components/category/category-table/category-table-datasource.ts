import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  of,
} from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/interfaces/category';

// TODO: Replace this with your own data model type
/**
 * Data source for the CategoryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CategoryTableDataSource extends DataSource<Category> {
  data: Category[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private categorySubject = new BehaviorSubject<Category[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalData: number = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private categoryService: CategoryService) {
    super();
  }

  connect(): Observable<Category[]> {
    return this.categorySubject.asObservable();
  }
  disconnect(): void {
    this.categorySubject.complete();
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
    this.categoryService
      .get(search, columnOrder, order, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: { totalData: number; data: Category[] }) => {
        this.totalData = resp.totalData;
        this.categorySubject.next(resp.data);
      });
  };
  addRow = (row: Category) => {
    this.categorySubject.next([row, ...this.categorySubject.value]);
  };
  modifyRow = (row: Category) => {
    this.categorySubject.next([
      row,
      ...this.categorySubject.value.filter(
        (category) => category.id !== row.id
      ),
    ]);
  };
  deleteRow = (id: number) => {
    console.log('llamo');
    this.categorySubject.next(
      this.categorySubject.value.filter((category) => category.id !== id)
    );
  };
}
