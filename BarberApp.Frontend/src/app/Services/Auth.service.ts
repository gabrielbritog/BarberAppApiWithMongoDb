import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';

const AUTH_API = 'https://localhost:7026/api/User/'
const LOGIN_ROUTE = 'Login';
const REGISTER_ROUTE = 'Register';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: UserModel): Observable<any>{
    return this.http.post(AUTH_API + LOGIN_ROUTE, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  register(credentials: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(AUTH_API + REGISTER_ROUTE, credentials);
  }
}
