import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacteristicService } from 'src/app/services/characteristic/characteristic.service';

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss'],
})
export class CharacteristicComponent {
  constructor(private characteristicService: CharacteristicService) {}

  formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  submit = () => {
    if (this.formControl.valid) {
      this.characteristicService.save(this.formControl.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };
}
