import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { Data } from 'src/app/providers/data';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
})
export class MenuDetailsComponent implements OnInit {
  menu: Menu = {
    id: null,
    name: null,
    short_name: null,
    price: null,
    category_name: null,
    category: null,
    prices: [],
  };

  constructor(
    private data: Data,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {
    this.route.queryParams.subscribe((params) => {
      const product_id = params['product_id'];
      this.menuService.get_one(product_id).subscribe((product) => {
        this.menu = product;
      });
    });
  }

  ngOnInit(): void {}
}
