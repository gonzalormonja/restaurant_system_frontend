import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { Data } from 'src/app/providers/data';
import { Router } from '@angular/router';
import { IngredientTableDataSource } from './ingredient-table-datasource';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss'],
})
export class IngredientTableComponent implements OnInit {
  @Input() subject;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Ingredient>;
  dataSource: IngredientTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'unit_of_measure', 'actions'];

  search = new FormControl('');

  constructor(
    private ingredientService: IngredientService,
    private data: Data,
    private router: Router
  ) {
    this.dataSource = new IngredientTableDataSource(this.ingredientService);
  }

  ngOnInit() {
    this.dataSource.loadData();
    this.search.valueChanges.subscribe((val) => {
      this.dataSource.loadData(val);
    });
    this.subject.subscribe((subs) => {
      if (subs.type === 'addRow') {
        this.dataSource.addRow(subs.row);
      } else if (subs.type === 'modifyRow') {
        this.dataSource.modifyRow(subs.row);
      }
    });
    this.table.dataSource = this.dataSource;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMenuPage()))
      .subscribe();
  }

  loadMenuPage = () => {
    this.dataSource.loadData(
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  };

  edit = (ingredient: Ingredient) => {
    this.subject.next({ type: 'edit', ingredient: ingredient });
  };

  delete = (id: number) => {
    this.ingredientService.delete(id).subscribe(
      (response) => {
        this.dataSource.deleteRow(id);
        this.subject.next({ type: 'refetchIngredients' });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  get_name_unit_of_measure = (id) => {
    return this.ingredientService.get_name_unit_of_measure(id);
  };
}
