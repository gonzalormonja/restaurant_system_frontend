import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormGroup({
      name: new FormControl(''),
      id: new FormControl(-1),
    }),
  });

  options = [
    { name: 'Pastas', id: 1 },
    { name: 'Carnes', id: 2 },
    { name: 'Vegetariano', id: 3 },
  ];

  filteredOptions: Observable<{ name: string; id: number }[]> | null = null;

  ngOnInit(): void {
    this.filteredOptions = this.formControl.controls.category.valueChanges.pipe(
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
      this.categoryService.save(this.formControl.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  selectCategory = (option: { name: string; id: number }) => {
    if (option.id > 0) {
      this.formControl.value.category = { name: option.name, id: option.id };
    }
  };
  blurCategory = () => {
    if (this.formControl.value.category.id === -1) {
      this.formControl.controls.category.reset();
    }
  };
}
