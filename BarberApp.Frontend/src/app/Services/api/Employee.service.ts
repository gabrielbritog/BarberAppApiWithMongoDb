import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/Helpers/environment';


const URL_API = environment.apiUrl;
// const BASE_URL_API = 'http://localhost:5066/api/'
const BASE_URL_API = `${URL_API}/api/`
const BASE_URL_API_BARBER = `Barber/`
const ROUTE_GETMANY = 'GetMany'
const ROUTE_UPDATE = 'User/UpdateFunc'

// /api/User/UpdateFunc?email=moisesmarchinipereira2%40gmail.com&barberId=646a74860b11f372f3b16c1a
// /api/User/UpdateFunc?email=moisesmarchinipereira2@gmail.com&barberId=646a74860b11f372f3b16c1a
// /api/User/UpdateFunc?email=moisesmarchinipereira2%40gmail.com&barberId=646a74860b11f372f3b16c1a
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getMany(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + BASE_URL_API_BARBER + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  getAll(): Observable<any> {
    return this.getMany(1, 50);
  }

  updateEmployee(employee: any, employeeEmail: string, employeeId: string): Observable<any> {
    return this.http.put<any>(BASE_URL_API + ROUTE_UPDATE + `?email=${encodeURIComponent(employeeEmail)}&barberId=${employeeId}`, employee)
  }

}
