import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserModel } from 'src/app/Models/UserModel';
import { DashboardSectionComponent } from 'src/app/Pages/Shared/DashboardPage/DashboardSection.component';
import * as moment from 'moment';

const TOKEN_KEY = 'auth-token';
const EXPIRATION_KEY = 'auth-expiration-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private route: Router) { }

  public signOut() {
    localStorage.clear();
    sessionStorage.clear();
    GlobalVariables.clearProperties();
    DashboardSectionComponent.isDashboardLoaded = false;
    window.location.reload();
  }

  public saveToken(token: string, expirationDate: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRATION_KEY, expirationDate);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getExpirationDate() {
    const expDate = localStorage.getItem(EXPIRATION_KEY);
    return moment(expDate, 'DD/MM/YYYY HH:MM');
  }

  public isTokenExpirated(): boolean{
    return moment().diff(moment(this.getExpirationDate()), 'seconds', true) >= 0;
  }

  public saveUser(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return localStorage.getItem(USER_KEY);
  }

  public getUserModel(): UserModel {
    let userString = this.getUser();

    if (userString)
      return Object.assign(new UserModel(), JSON.parse(userString));

    return new UserModel();
  }

  public isAdmin(): boolean{
    return this.getUserModel().barberId === undefined;
  }

  public getUserLevel() {
    return this.getUserModel().userLevel;
  }

}
