import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  products: Menu[] = [];
  products_backup: Menu[] = [];
  search = new FormControl('');

  ngOnInit(): void {
    this.menuService.get('', 'createdAt', 'desc', 0, 10).subscribe((resp) => {
      this.products = resp.data;
      this.products_backup = resp.data;
    });

    this.search.valueChanges.subscribe((val) => {
      if (val.trim().length <= 0) {
        this.products = this.products_backup;
      }
      val = new RegExp(val, 'i');
      this.products = this.products_backup.filter((product) => {
        if (
          product.name.match(val) ||
          product.category.name.match(val) ||
          product.price.toString().match(val)
        ) {
          return true;
        }
        return false;
      });
    });
  }
}
