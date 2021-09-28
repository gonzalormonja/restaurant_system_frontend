import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/interfaces/menu';

// TODO: Replace this with your own data model type
/**
 * Data source for the MenuTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MenuTableDataSource extends DataSource<Menu> {
  data: Menu[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private menuSubject = new BehaviorSubject<Menu[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalData: number = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private menuService: MenuService) {
    super();
  }

  connect(): Observable<Menu[]> {
    return this.menuSubject.asObservable();
  }
  disconnect(): void {
    this.menuSubject.complete();
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
    this.menuService
      .get(search, columnOrder, order, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: { totalData: number; data: Menu[] }) => {
        this.totalData = resp.totalData;
        this.menuSubject.next(resp.data);
      });
  };
  addRow = (row: Menu) => {
    this.menuSubject.next([row, ...this.menuSubject.value]);
  };
  modifyRow = (row: Menu) => {
    this.menuSubject.next([
      row,
      ...this.menuSubject.value.filter((menu) => menu.id !== row.id),
    ]);
  };
  deleteRow = (id: number) => {
    console.log('llamo');
    this.menuSubject.next(
      this.menuSubject.value.filter((menu) => menu.id !== id)
    );
  };
}
