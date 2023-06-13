import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

import { environment } from 'src/app/Helpers/environment';
import { UserConfig } from '../../Models/UserConfig';
import { TokenStorageService } from '../auth/token-storage.service';


// Enum UserLevel
//
// ClientLevel = 0  => CLIENTE
// BarberLevel = 1  => BARBEIRO
// AdminLevel = 2   => EMPRESA


const URL_API = environment.apiUrl;

const API_URL = `${URL_API}/api/`;

const ADMIN_ROUTE = 'User/';
const BARBER_ROUTE = 'Barber/';
const UPDATE_ROUTE = 'Update';
const GETBYID_ROUTE = 'GetById';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getCompanyUser(): Observable<any> {
    const userId = this.tokenStorage.getUserModel().userId;

    return this.http.get<any>(API_URL + ADMIN_ROUTE + GETBYID_ROUTE, {
      params: {
        id: userId?? ''
      }
    }).pipe(
      map((response: { data: any; }) => response.data.userConfig)
    );
  }

  getCompanyRegistrationDate(): Observable<any> {
    const userId = this.tokenStorage.getUserModel().userId;

    return this.http.get<any>(API_URL + ADMIN_ROUTE + GETBYID_ROUTE, {
      params: {
        id: userId ?? '',
        'HideLoader': 'true'
      }
    }).pipe(
      map((response: { data: any; }) => response.data.userRegistration)
    );
  }

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

  updateProfilePic(imageBase64: any): Observable<any>{
    return this.http.put<any>(API_URL+ (GlobalVariables.isAdmin ? ADMIN_ROUTE : BARBER_ROUTE) + UPDATE_ROUTE, {
      urlImage: imageBase64
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
