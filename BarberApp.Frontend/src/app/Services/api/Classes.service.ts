import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/Helpers/environment';
import { ClassesFrontModel, ClassesModel } from 'src/app/Models/ClassesModel';
import { ClientModel } from 'src/app/Models/ClientModel';
import { TokenStorageService } from '../auth/token-storage.service';

const URL_API = environment.apiUrl;
const BASE_URL_API = `${URL_API}/api/Class/`;
const ROUTE_REGISTER = 'Register';
const ROUTE_UPDATE = 'Update';
const ROUTE_GETMANY = 'GetMany';
const ROUTE_GETALL = 'GetAll';
const ROUTE_GETBYID = 'GetById';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETALL);
  }

  getMany(skip: number, take: number): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  register(_class: ClassesModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + ROUTE_REGISTER, _class);
  }

  update(_class: ClassesModel): Observable<any> {
    return this.http.put<any>(BASE_URL_API + ROUTE_UPDATE, _class);
  }

}
