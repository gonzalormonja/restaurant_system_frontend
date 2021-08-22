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
  @Input() newRow;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  dataSource: CategoryTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'category'];

  constructor(private categoryService: CategoryService) {
    this.dataSource = new CategoryTableDataSource(this.categoryService);
  }

  ngOnInit() {
    this.dataSource.loadData();
    // console.log(this.dataSource)
    this.newRow.subscribe(row => {
      console.log('acas',row)
      this.dataSource.addRow(row)
      // this.table.dataSource
      // this.dataSource.data = this.dataSource.data.slice();
      // this.dataSource.addRow(row)
    })
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
}
