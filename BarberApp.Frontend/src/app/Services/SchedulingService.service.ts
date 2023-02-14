import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';

const BASE_URL_API = 'http://localhost:5066/api/'
const URL_SERVICETYPE = 'ServiceType/'
const URL_SCHEDULING = 'Scheduling/'
const ROUTE_REGISTER = 'Register'
const ROUTE_GETALL = 'GetAll'
const ROUTE_GETBYID = 'GetById/'
const ROUTE_UPDATE = 'Update'

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private http: HttpClient) { }

  registerServiceType(serviceType: ServiceTypeModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_REGISTER, {
      nameService: serviceType.nameService,
      valueService: serviceType.valueService
    });
  }

  getAllServiceType(): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_GETALL);
  }

  registerSchedule(schedule: ScheduleModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_REGISTER, {
      clientName: schedule.clientName,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate
    });
  }

  getAllSchedule(): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_GETALL);
  }

  getScheduleById(id: number): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_GETBYID + id);
  }

}
