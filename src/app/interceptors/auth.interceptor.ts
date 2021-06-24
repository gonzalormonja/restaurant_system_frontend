import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/auth/token-storage.service';
import getTimezone from '../utils/getTimezone';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.token.getToken();
    if (token !== null) {
      authReq = request.clone({
        headers: request.headers.set('token', token),
      });
    }
    authReq = request.clone({
      headers: request.headers.set('tz', getTimezone()),
    });
    return next.handle(request);
  }
}
