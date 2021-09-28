import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from 'src/app/providers/data';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
})
export class MenuDetailsComponent implements OnInit {
  menu = null;

  constructor(private data: Data, private router: Router) {
    if (!this.data.storage) {
      this.router.navigate(['menus']);
    }
    this.menu = this.data.storage;
  }

  ngOnInit(): void {}
}
