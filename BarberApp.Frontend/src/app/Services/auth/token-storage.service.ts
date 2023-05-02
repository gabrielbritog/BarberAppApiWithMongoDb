import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserModel } from 'src/app/Models/UserModel';
import { DashboardSectionComponent } from 'src/app/Pages/Shared/DashboardPage/DashboardSection.component';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private route: Router) { }

  public signOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigateByUrl('/');
    GlobalVariables.clearProperties();
    DashboardSectionComponent.isDashboardLoaded = false;
    // window.location.reload();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY);
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
}
