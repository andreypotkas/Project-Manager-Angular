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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public userSignup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  public get nameSignup(): AbstractControl {
    return this.userSignup.get('name') as AbstractControl;
  }
  public get loginSignup(): AbstractControl {
    return this.userSignup.get('login') as AbstractControl;
  }
  public get passwordSignup(): AbstractControl {
    return this.userSignup.get('password') as AbstractControl;
  }

  signup() {
    this.authService
      .signup(this.userSignup.value)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
