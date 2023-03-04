import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { GlobalVariables } from '../Helpers/GlobalVariables';
import { UserConfig } from '../Models/UserConfig';


// Enum UserLevel
//
// ClientLevel = 0  => CLIENTE
// BarberLevel = 1  => BARBEIRO
// AdminLevel = 2   => EMPRESA

// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;

const API_URL = `http://${MACHINE_IP}:5066/api/`;

const ADMIN_ROUTE = 'User/'
const BARBER_ROUTE = 'Barber/'
const UPDATE_ROUTE = 'Update';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  update(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      companyName: credentials.companyName,
      firstname: credentials.firstname,
      Lastname: credentials.lastname,
      cep: credentials.cep,
      phoneNumber: credentials.phoneNumber
    });
  }

  updateBarber(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL + BARBER_ROUTE + UPDATE_ROUTE, {
      barberId: credentials.barberId,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      urlImage: credentials.urlImage,
      phoneNumber: credentials.phoneNumber
    });
  }

  updateName(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      firstname: credentials.firstName,
      Lastname: credentials.lastName
    });
  }

  updateEmail(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      email: credentials.email
    });
  }

  updatePhone(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      phoneNumber: credentials.phoneNumber
    });
  }

  updatePassword(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      password: credentials.password
    });
  }

  updateProfilePic(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      urlImage: credentials.urlImage
    });
  }

  updateCep(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      cep: credentials.cep
    });
  }

  updateCompanyName(credentials: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      companyName: credentials.companyName
    });
  }

  updateUserConfig(config: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      userConfig: config
    }, {params: {'HideLoader': 'true'}})
  }

  updateWorkingDays(workingDays: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      workingDays: workingDays
    })
  }

}
