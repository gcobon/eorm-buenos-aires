import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') || null;

    const ContentType = ['application/json'];

    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType,
        },
      });
    } else {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            Swal.fire({
              title: 'Error',
              text: 'Algo salió mal',
              icon: 'error',
            });
            break;
          case 401:
            Swal.fire({
              title: 'Atención',
              text: 'Usuario y/o contraseña incorrectos',
              icon: 'warning',
            });
            break;
          default:
            Swal.fire({
              title: 'Error',
              text: `${error.status} ${error.error.message}`,
              icon: 'error',
            });
            break;
        }

        return throwError(error);
      })
    );
  }
}
