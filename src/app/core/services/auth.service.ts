import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map, mergeMap } from "rxjs";
import { IToken } from "../../auth/models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string | null;
  public userSignin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public userSignup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.token = localStorage.getItem('token');
  }
  public checkToken():void{
    if(localStorage.getItem('token')){
      /* this.router.navigate(['/main']); */ //TODO 
    } else {
      this.router.navigate(['/welcome']);
    }
  }
  public signup():void{
    this.http.post('/api/signup', this.userSignup.value).pipe(
      mergeMap(() => this.http.post<IToken>('/api/signin', {
        login: this.userSignup.value.login,
        password :this.userSignup.value.password,
       },
    )),
    map((data: IToken) => data.token)).subscribe((token: string) => {
      this.token = token;
      localStorage.setItem('token', token);
    });
  }
  public signin():void{
    this.http.post<IToken>('/api/signin', this.userSignin.value).pipe(
      map((data: IToken) => data.token)).subscribe((token: string) => {
      console.log(token);
      this.token = token;
      localStorage.setItem('token', token);
    });
  }
  public get loginSignin(): AbstractControl {
    return this.userSignin.get('login') as AbstractControl;
  }
  public get passwordSignin(): AbstractControl {
    return this.userSignin.get('password') as AbstractControl;
  }
  public get nameSignup(): AbstractControl {
    return this.userSignup.get('name') as AbstractControl;
  }
  public get loginSignup(): AbstractControl {
    return this.userSignup.get('login') as AbstractControl;
  }
  public get passwordSignup(): AbstractControl {
    return this.userSignup.get('password') as AbstractControl;
  }
  /* getUsers(){
    return this.http.get('/api/users', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  getUser(id: string){
    return this.http.get(`/api/users/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  } */
}