import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { BarberModel } from '../Models/BarberModel';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }

  public getUserModel() {
    let userString = this.getUser();

    if (userString)
      return Object.assign(new UserModel(), JSON.parse(userString));

    return null;
  }
}
