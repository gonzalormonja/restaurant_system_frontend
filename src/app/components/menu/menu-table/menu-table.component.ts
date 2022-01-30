import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuTableDataSource } from './menu-table-datasource';
import { Router } from '@angular/router';
import { Data } from 'src/app/providers/data';
@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss'],
})
export class MenuTableComponent implements OnInit {
  @Input() subject;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Menu>;
  dataSource: MenuTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'category', 'acciones'];

  search = new FormControl('');

  constructor(
    private menuService: MenuService,
    private data: Data,
    private router: Router
  ) {
    this.dataSource = new MenuTableDataSource(this.menuService);
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
  }

  ngAfterViewInit(): void {
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

  edit = (menu: Menu) => {
    console.log(menu);
    this.subject.next({ type: 'editMenu', menu: menu });
  };

  delete = (id: number) => {
    this.menuService.delete(id).subscribe(
      (response) => {
        this.dataSource.deleteRow(id);
        this.subject.next({ type: 'refetchCategories' });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  open_in_new_tab = (menu: Menu) => {
    this.data.storage = { ...menu };
    this.router.navigate(['menu_details']);
  };
}
