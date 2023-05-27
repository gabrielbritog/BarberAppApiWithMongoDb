import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { TokenStorageService } from '../Services/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../Components/Spinner/spinner.service';

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService,
    private toastrService: ToastrService,
    private spinnerService: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    const hideLoader = req.params.get('HideLoader');

    if (hideLoader)
      req = req.clone({ params: req.params.delete('HideLoader', 'true') });
    else
      this.spinnerService.show();

    let authReq = req;
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if(event.body.message != '' && !hideLoader){
              this.toastrService.success(event.body.message);
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if(error.error.message){
              this.toastrService.error(error.error.message);
            }
            else{
              this.toastrService.error('Algo deu errado');
            }
            this.spinnerService.hide();
          }
        }
      ),
      finalize(() => {
        if(!hideLoader)
          this.spinnerService.hide();
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
