import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./categoryForm.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() newRow;

  constructor(private categoryService: CategoryService) {}
  formControl = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit',
    }),
    category: new FormGroup({
      name: new FormControl(''),
      id: new FormControl(-1),
    }),
  });
  category_name = new FormControl('');
  options: Category[] = null;

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.getCategories();
    this.category_name.valueChanges.subscribe((response) => {
      this.getCategories(response);
    });
  };

  submit = (form) => {
    if (this.formControl.valid) {
      this.categoryService
        .save({
          name: this.formControl.value.name,
          idCategory: Number(this.formControl.value.category.id),
        })
        .subscribe(
          (response) => {
            this.resetForm(form);
            this.newRow.next({
              name: response.name,
              id: response.id,
              category: response.category,
            });
            this.getCategories();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  };

  getCategories = (search = '') => {
    this.categoryService.get(search).subscribe((response) => {
      this.options = response;
    });
  };

  getOptionText = (option) => {
    return option.name;
  };

  selectCategory = (option: { name: string; id: number }) => {
    if (option.id > 0) {
      this.formControl.controls.category.patchValue({
        name: option.name,
        id: option.id,
      });
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
  resetForm = (form) => {
    form.resetForm();
    this.formControl.reset();
    this.category_name.patchValue('');
  };
}
