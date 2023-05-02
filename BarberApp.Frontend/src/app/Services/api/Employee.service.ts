import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../../Helpers/GlobalVariables';


const URL_API = GlobalVariables.API_BASE_URL;
// const BASE_URL_API = 'http://localhost:5066/api/'
const BASE_URL_API = `${URL_API}/api/Barber/`
const ROUTE_GETMANY = 'GetMany'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getMany(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  getAll(): Observable<any> {
    return this.getMany(1, 50);
  }

}
