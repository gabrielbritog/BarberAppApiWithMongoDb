import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { GlobalVariables } from '../Helpers/GlobalVariables';


// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
const AUTH_API = `http://${MACHINE_IP}:5066/api/User/`


const LOGIN_ROUTE = 'Login';
const REGISTER_ROUTE = 'Register';
const UPDATE_ROUTE = 'Update';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + LOGIN_ROUTE, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  register(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.post(AUTH_API + REGISTER_ROUTE, {
      firstname: credentials.firstname,
      Lastname: credentials.lastname,
      cep: 'Não definido',
      email: credentials.email,
      password: credentials.password,
      phoneNumber: 'Não definido'
    });
  }

  update(credentials: any): Observable<any>{
    LoaderComponent.SetOptions(true);
    return this.http.put(AUTH_API + UPDATE_ROUTE, {
      firstname: credentials.firstname,
      Lastname: credentials.lastname,
      cep: credentials.cep,
      // email: credentials.email,
      phoneNumber: credentials.phonenumber
    });
  }
}
