import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  @Input() product: Menu;

  constructor() {}

  ngOnInit(): void {
    this.product.name =
      this.product.name +
      this.product.name +
      this.product.name +
      this.product.name;

    this.product.name =
      this.product.name.length < 40
        ? this.product.name
        : `${this.product.name.slice(0, 40)}...`;
  }
}
