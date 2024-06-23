import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', token)
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Forbidden) {
            alert("No tienes permisos para acceder a esta sección.");
            return EMPTY;
          } else if (error.status === HttpStatusCode.Unauthorized) {
            alert("Credenciales inválidas. Por favor, inicia sesión de nuevo.");
            this.loginService.closeSession();
            this.router.navigate(['/login']);
            return EMPTY;
          } else {
            return throwError(() => error);
          }
        })
      );
    }
    return next.handle(request);
  }
}
