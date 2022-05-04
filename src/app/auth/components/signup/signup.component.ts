import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public userSignup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
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
      .subscribe((token: string) => {
        console.log(token);
        this.authService.saveToken(token);
      });
  }
}
