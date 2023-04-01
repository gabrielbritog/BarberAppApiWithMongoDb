import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { TokenStorageService } from '../Services/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService,
    private toastrService: ToastrService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    const hideLoader = req.params.get('HideLoader');
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    if (hideLoader)
      req = req.clone({ params: req.params.delete('HideLoader', 'true') });
    else
      LoaderComponent.SetOptions(true);

    return next.handle(authReq).pipe(
      finalize(() => {
        if(!hideLoader)
          LoaderComponent.SetOptions(false);
      }),
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if(event.body.message != ''){
              this.toastrService.success(event.body.message);
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if(error.error.data){
              this.toastrService.error(error.error.data);
            }
            else{
              this.toastrService.error('Algo deu errado');
            }
            LoaderComponent.SetOptions(false);
          }
        }
      )
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
