import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((response: any) => {
        if (
          typeof response === 'object' &&
          Object.entries(response).length === 1 &&
          response.message
        ) {
          return response.message;
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          new HttpErrorResponse({
            ...error,
            statusText: error?.error?.message || error.statusText
          })
        );
      })
    );
  }
}
