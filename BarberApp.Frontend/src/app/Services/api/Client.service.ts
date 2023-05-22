import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from '../auth/token-storage.service';
import { ClientModel } from '../../Models/ClientModel';


const URL_API = GlobalVariables.API_BASE_URL;
const BASE_URL_API = `${URL_API}/api/Client/`;
const ROUTE_REGISTER = 'Register';
const ROUTE_UPDATE = 'Update';
const ROUTE_GETMANY = 'GetMany';
const ROUTE_GETALL = 'GetAll';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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

  register(client: ClientModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + ROUTE_REGISTER, client);
  }

  update(client: ClientModel): Observable<any> {
    return this.http.put<any>(BASE_URL_API + ROUTE_UPDATE, client);
  }

}
