import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  @Input() product: Menu;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.product.name =
      this.product.name.length < 40
        ? this.product.name
        : `${this.product.name.slice(0, 40)}...`;
  }

  open_in_new_tab = () => {
    this.router.navigate(['menu_details'], {
      queryParams: { product_id: this.product.id },
    });
  };
}
