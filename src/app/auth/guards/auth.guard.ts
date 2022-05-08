import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.canActivate()) this.router.navigate(['/authorization/signin']);
  }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn;
  }
  public canLoad(
    route: Route
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isLoggedIn;
  }
}
