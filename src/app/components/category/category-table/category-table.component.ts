import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryTableDataSource } from './category-table-datasource';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  @Input() subject;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  dataSource: CategoryTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'category', 'acciones'];

  constructor(private categoryService: CategoryService) {
    this.dataSource = new CategoryTableDataSource(this.categoryService);
  }

  ngOnInit() {
    this.dataSource.loadData();
    this.subject.subscribe((subs) => {
      if (subs.type === 'addRow') {
        this.dataSource.addRow(subs.row);
      } else if (subs.type === 'modifyRow') {
        this.dataSource.modifyRow(subs.row);
      }
    });
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCategoryPage()))
      .subscribe();
  }

  loadCategoryPage = () => {
    this.dataSource.loadData(
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  };

  edit = (category: Category) => {
    this.subject.next({ type: 'editCategory', category: category });
  };

  delete = (id: number) => {
    this.categoryService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.dataSource.deleteRow(id);
        this.subject.next({ type: 'refetchCategories' });
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('aca');
      }
    );
  };
}
