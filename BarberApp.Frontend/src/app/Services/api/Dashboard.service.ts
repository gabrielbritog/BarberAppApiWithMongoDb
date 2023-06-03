import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/Helpers/environment';


const URL_API = environment.apiUrl;
const BASE_URL_API = `${URL_API}/api/Dashboard/`;
const ROUTE_HISTORIC = 'GetHistoric';
const ROUTE_GETMANY = 'GetManySchedulingByDate';
const ROUTE_GETTOP = 'GetTop';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getHistoric(start: number, end: number): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_HISTORIC, {
      params: {
        startDate: start,
        endDate: end
      }
    });
  }

  getManySchedulingByDate(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETMANY, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });
  }

  getTopClients(top: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETTOP, {
      params: {
        type: 0,
        top: top,
        first: startDate,
        last: endDate
      }
    });
  }

  getTopEmployees(top: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETTOP, {
      params: {
        type: 1,
        top: top,
        first: startDate,
        last: endDate
      }
    });
  }

  getTopServices(top: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETTOP, {
      params: {
        type: 2,
        top: top,
        first: startDate,
        last: endDate
      }
    });
  }

}
