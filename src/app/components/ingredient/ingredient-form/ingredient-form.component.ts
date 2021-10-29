import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
})
export class IngredientFormComponent implements OnInit {
  constructor(private ingredientService: IngredientService) {
    this.options = ingredientService.get_options();
  }
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;
  @Input() subject;

  formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    unit_of_measure: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
  });

  unit_of_measure_name = new FormControl('');

  options = [];

  mode: 'edit' | 'save' = 'save';
  edit_id: number = null;

  filteredOptions: Observable<{ name: string; id: string }[]> | null = null;

  ngOnInit(): void {
    this.initForm();
    this.subject.subscribe((subs) => {
      if (subs.type === 'edit') {
        this.mode = 'edit';
        this.edit_id = subs.ingredient.id;
        console.log(
          this.ingredientService.get_name_unit_of_measure(
            subs.ingredient.unit_of_measure
          )
        );
        this._auto.writeValue(
          subs.ingredient.unit_of_measure
            ? this.ingredientService.get_name_unit_of_measure(
                subs.ingredient.unit_of_measure
              )
            : null
        );
        this.formControl.controls.name.patchValue(subs.ingredient?.name);
        this.formControl.controls.unit_of_measure.patchValue({
          name: this.ingredientService.get_name_unit_of_measure(
            subs.ingredient?.unit_of_measure?.id
          ),
          id: subs.ingredient?.unit_of_measure?.id,
        });
      }
    });
  }

  initForm = () => {
    this.filteredOptions =
      this.formControl.controls.unit_of_measure.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value.name))
      );
  };

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

  submit = (form) => {
    console.log(
      this.formControl.value,
      this.formControl.valid,
      this.formControl.value.unit_of_measure.id.valid
    );
    if (this.formControl.valid) {
      this.ingredientService
        .save({
          name: this.formControl.value.name,
          unit_of_measure: this.formControl.value.unit_of_measure.id,
        })
        .subscribe(
          (response) => {
            this.subject.next({
              type: 'addRow',
              row: {
                name: response.name,
                unit_of_measure: response.unit_of_measure,
              },
            });
            this.resetForm(form);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  };
  selectUnitOfMeasure = (option: { name: string; id: string }) => {
    if (option.id) {
      console.log(option);
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
  resetForm = (form) => {
    form.resetForm();
    this.formControl.reset();
    this.unit_of_measure_name.patchValue('');
  };
}
