import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';

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
      id: new FormControl('', [Validators.required]),
    }),
  });

  options = [
    { name: 'Peso (kg, g, mg)', id: 'weight' },
    { name: 'Litro (l, ml)', id: 'liter' },
    { name: 'Logintud (m, cm, mm)', id: 'length' },
    { name: 'Unidad', id: 'unit' },
  ];

  filteredOptions: Observable<{ name: string; id: string }[]> | null = null;

  ngOnInit(): void {
    this.filteredOptions =
      this.formControl.controls.unit_of_measure.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value.name))
      );
  }

  private _filter(value: string): { name: string; id: string }[] {
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
  selectUnitOfMeasure = (option: { name: string; id: string }) => {
    if (option.id) {
      this.formControl.value.unit_of_measure = {
        name: option.name,
        id: option.id,
      };
    }
  };
  blurUnitOfMeasure = () => {
    if (!this.formControl.value.unit_of_measure.id) {
      this.formControl.controls.unit_of_measure.reset();
    }
  };
}
