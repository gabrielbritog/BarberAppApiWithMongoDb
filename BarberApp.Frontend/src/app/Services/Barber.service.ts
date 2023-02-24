import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../Helpers/GlobalVariables';
import { BarberModel } from '../Models/BarberModel';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';

// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
// const BASE_URL_API = 'http://localhost:5066/api/'
const BASE_URL_API = `http://${MACHINE_IP}:5066/api/Barber/`
const ROUTE_GETMANY = 'GetMany'


@Injectable({
  providedIn: 'root'
})
export class BarberService {

  constructor(private http: HttpClient) { }

  getMany(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  getAllBarbers(): Observable<any> {
    return this.getMany(1, 50);
  }

}
