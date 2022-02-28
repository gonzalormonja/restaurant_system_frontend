import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.menuService.get('', 'createdAt', 'desc', 0, 10).subscribe((resp) => {
      this.products = resp.data;
    });
  }
}
