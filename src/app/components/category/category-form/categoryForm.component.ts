import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./categoryForm.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormGroup({
      name: new FormControl(''),
      id: new FormControl(-1),
    }),
  });

  filteredOptions: Observable<Category[]> | null = null;

  ngOnInit(): void {
    this.formControl.controls.category.valueChanges
      .pipe(startWith(''))
      .subscribe((value) => {
        console.log(value)
        this.filteredOptions = this.categoryService.get(value.name);
      });
  }

  submit = () => {
    if (this.formControl.valid) {
      this.categoryService
        .save({
          name: this.formControl.value.name,
          idCategory: Number(this.formControl.controls.category.value.id),
        })
        .subscribe(
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
      this.formControl.controls.category.patchValue({
        name: '',
        id: -1,
      });
    }
  };
}
