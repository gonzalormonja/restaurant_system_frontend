import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Menu } from 'src/app/interfaces/menu';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menuForm.component.html',
  styleUrls: ['./menuForm.component.scss'],
})
export class MenuFormComponent implements OnInit {
  @Input() subject;
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService
  ) {}
  formControl = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit',
    }),
    short_name: new FormControl(''),
    price: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit',
    }),
    category: new FormGroup({
      name: new FormControl(''),
      id: new FormControl(-1),
    }),
  });
  category_name = new FormControl('');
  mode: 'edit' | 'save' = 'save';
  edit_id: number = null;
  options: Menu[] = null;

  ngOnInit(): void {
    this.initForm();
    this.subject.subscribe((subs) => {
      if (subs.type === 'editMenu') {
        console.log(subs);
        this.mode = 'edit';
        this.edit_id = subs.menu.id;
        this._auto.writeValue(subs.menu.category ? subs.menu.category : null);
        this.formControl.controls.name.patchValue(subs.menu?.name);
        this.formControl.controls.price.patchValue(subs.menu?.prices[0].price);
        this.formControl.controls.short_name.patchValue(subs.menu?.short_name);
        this.formControl.controls.category.patchValue({
          name: subs.menu?.menu?.name,
          id: subs.menu?.menu?.id,
        });
      }
    });
  }

  initForm = () => {
    this.getCategories();
    this.category_name.valueChanges.subscribe((response) => {
      this.getCategories(response);
    });
  };

  submit = (form) => {
    if (this.formControl.valid) {
      if (this.mode === 'save') {
        this.menuService
          .save({
            name: this.formControl.value.name,
            short_name: this.formControl.value.short_name,
            price: this.formControl.value.price,
            idCategory: Number(this.formControl.value.category.id),
          })
          .subscribe(
            (response) => {
              this.resetForm(form);
              this.subject.next({
                type: 'addRow',
                row: {
                  name: response.name,
                  id: response.id,
                  category: response.category,
                },
              });
            },
            (error) => {
              console.error(error);
            }
          );
      } else {
        this.menuService
          .edit({
            id: this.edit_id,
            name: this.formControl.value.name,
            short_name: this.formControl.value.short_name,
            price: this.formControl.value.price,
            idCategory: Number(this.formControl.value.category.id),
          })
          .subscribe(
            (response) => {
              this.resetForm(form);
              this.subject.next({
                type: 'modifyRow',
                row: {
                  name: response.name,
                  id: response.id,
                  category: response.category,
                },
              });
            },
            (error) => {
              console.error(error);
            }
          );
      }
    }
  };

  getCategories = (search = '') => {
    this.categoryService.get(search).subscribe((response) => {
      this.options = response.data;
    });
  };

  getOptionText = (option) => {
    return option?.name;
  };

  selectCategory = (option: { name: string; id: number }) => {
    if (option.id > 0) {
      this.formControl.controls.category.patchValue({
        name: option.name,
        id: option.id,
      });
    }
  };
  blurMenu = () => {
    if (this.formControl.value.menu.id === -1) {
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
