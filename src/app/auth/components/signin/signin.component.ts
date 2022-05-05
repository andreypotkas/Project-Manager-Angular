import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public userSignin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
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
        console.log(token);
        this.authService.saveToken(token);
      });
  }
}
