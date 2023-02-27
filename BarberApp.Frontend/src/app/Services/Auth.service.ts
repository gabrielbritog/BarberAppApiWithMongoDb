import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { GlobalVariables } from '../Helpers/GlobalVariables';
import { UserConfig } from '../Models/UserConfig';


// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
const AUTH_API = `http://${MACHINE_IP}:5066/api/`

const ADMIN_ROUTE = 'User/';
const BARBER_ROUTE = 'Barber/';

const LOGIN_ROUTE = 'Login';
const REGISTER_ROUTE = 'Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + ADMIN_ROUTE + LOGIN_ROUTE, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  loginBarber(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + BARBER_ROUTE + LOGIN_ROUTE, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  register(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + ADMIN_ROUTE + REGISTER_ROUTE, {
      userConfig: credentials.userConfig,
      companyName: credentials.companyName,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      cep: 'Não definido',
      email: credentials.email,
      password: credentials.password,
      phoneNumber: 'Não definido'
    });
  }

  registerBarber(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + BARBER_ROUTE + REGISTER_ROUTE, {
      userConfig: credentials.userConfig,
      companyName: credentials.associatedCompany,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      urlImage: credentials.urlImage,
      password: credentials.password,
      phoneNumber: credentials.phoneNumber,
      workingDays: credentials.workingDays
    });
  }
}
