import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private baseUrl = this.appConfig.API_URL;
  constructor(private appConfig: AppConfig) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`,
    });
    return next.handle(apiReq);
  }
}
