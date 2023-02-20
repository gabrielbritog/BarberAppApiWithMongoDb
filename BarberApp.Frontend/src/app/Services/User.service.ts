import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Enum UserLevel
//
// ClientLevel = 0  => CLIENTE
// BarberLevel = 1  => BARBEIRO
// AdminLevel = 2   => EMPRESA

const API_URL = 'https://localhost:7026/api/User/'
const USER_BOARD = 'user';
const ADMIN_BOARD = 'admin';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<any>{
    return this.http.get(API_URL + USER_BOARD, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any>{
    return this.http.get(API_URL + ADMIN_BOARD, { responseType: 'text' });
  }

}
