import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public userSignin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}
  public get loginSignin(): AbstractControl {
    return this.userSignin.get('login') as AbstractControl;
  }
  public get passwordSignin(): AbstractControl {
    return this.userSignin.get('password') as AbstractControl;
  }
  signin() {
    this.authService
      .signin(this.userSignin.value)
      .pipe(take(1))
      .subscribe((token: string) => {
        this.authService.saveToken(token);
        this.router.navigate(['/boards']);
      });
  }
}
