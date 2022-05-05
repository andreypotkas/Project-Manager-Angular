import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { IToken, IUser } from '../../auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string | null;
  constructor(public http: HttpClient, public router: Router) {
    this.token = localStorage.getItem('token');
  }
  public checkToken(): void {
    if (localStorage.getItem('token')) {
      /* this.router.navigate(['/main']); */
      //TODO
    } else {
      this.router.navigate(['/welcome']);
    }
  }
  public signup(data: IUser): Observable<any> {
    return this.http.post('/api/signup', data).pipe(
      mergeMap(() =>
        this.http.post<IToken>('/api/signin', {
          login: data.login,
          password: data.password,
        })
      ),
      map((data: IToken) => data.token)
    );
  }
  public signin(data: IUser): Observable<any> {
    return this.http
      .post<IToken>('/api/signin', data)
      .pipe(map((data: IToken) => data.token));
  }
  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
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
