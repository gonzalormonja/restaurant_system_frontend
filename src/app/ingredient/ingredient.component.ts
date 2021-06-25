import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientService } from '../services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  constructor(private ingredientService: IngredientService) {}

  formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    unit_of_measure: new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(-1, [Validators.required]),
    }),
  });

  options = [
    { name: 'Miligramo', id: 1 },
    { name: 'Gramo', id: 2 },
    { name: 'Kilogramo', id: 3 },
    { name: 'unidad', id: 4 },
  ];

  filteredOptions: Observable<{ name: string; id: number }[]> | null = null;

  ngOnInit(): void {
    this.filteredOptions =
      this.formControl.controls.unit_of_measure.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value.name))
      );
  }

  private _filter(value: string): { name: string; id: number }[] {
    const filterValue = value?.toLowerCase();

    if (filterValue) {
      return this.options.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      return this.options.filter((option) => option.name);
    }
  }

  submit = () => {
    if (this.formControl.valid) {
      this.ingredientService.save(this.formControl.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };
  selectUnitOfMeasure = (option: { name: string; id: number }) => {
    if (option.id > 0) {
      this.formControl.value.unit_of_measure = {
        name: option.name,
        id: option.id,
      };
    }
  };
  blurUnitOfMeasure = () => {
    if (this.formControl.value.unit_of_measure.id === -1) {
      this.formControl.controls.unit_of_measure.reset();
    }
  };
}
