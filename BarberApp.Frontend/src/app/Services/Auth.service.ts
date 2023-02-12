import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';

const AUTH_API = 'http://localhost:5066/api/User/'
const LOGIN_ROUTE = 'Login';
const REGISTER_ROUTE = 'Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any>{
    return this.http.post(AUTH_API + LOGIN_ROUTE, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  register(credentials: any): Observable<any>{
    return this.http.post(AUTH_API + REGISTER_ROUTE, {
      firstname: credentials.firstname,
      Lastname: credentials.lastname,
      cep: 'Não definido',
      email: credentials.email,
      password: credentials.password,
      phoneNumber: 'Não definido'
    });
  }
}
