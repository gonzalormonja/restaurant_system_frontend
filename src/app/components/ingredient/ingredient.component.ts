import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent {
  constructor() {}
  subject = new Subject();
}
