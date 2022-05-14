import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { IToken, IUser, IUserResponse } from '../../auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string | null;
  public userId: string | null = '';
  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
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
    return this.http.post<IUserResponse>('signup', data).pipe(
      tap((data: IUserResponse) => {
        this.saveUserId(data.id);
      }),
      mergeMap(() =>
        this.http.post<IToken>('signin', {
          login: data.login,
          password: data.password,
        })
      ),
      map((data: IToken) => data.token)
    );
  }
  public signin(data: IUser): Observable<any> {
    return this.http
      .post<IToken>('signin', data)
      .pipe(map((data: IToken) => data.token));
  }
  public saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  private saveUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  public getUserToken(): string {
    return String(this.token);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  public getUserId(): string | null {
    return this.userId ? this.userId : localStorage.getItem('userId');
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
