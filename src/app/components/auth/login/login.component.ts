import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  submit = () => {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (response) => {
          this.tokenStorageService.saveToken(response.token);
          this.tokenStorageService.saveUser(response.user);
          this.router.navigate(['']);
        },
        (error) => {
          console.error(error);
        }
      );
  };
}
