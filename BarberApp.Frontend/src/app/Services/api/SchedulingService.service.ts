import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';



const URL_API = environment.apiUrl;

const URL_BARBER = 'Barber/'
const URL_SCHEDULING = 'Scheduling/'
const ROUTE_DELETEALL= 'DeleteAll/'
const ROUTE_REGISTER = 'Register'
const ROUTE_GETMANY = 'GetMany'
const ROUTE_GETBYID = 'GetById/'
const ROUTE_UPDATE = 'Update'

const BASE_URL_API = `${URL_API}/api/`;

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private http: HttpClient) { }

  register(schedule: ScheduleModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + (!GlobalVariables.isAdmin ? URL_BARBER : '') + URL_SCHEDULING + ROUTE_REGISTER, {
      barberId: schedule.barberId,
      client: schedule.client,
      class: schedule.schedulingClass,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate,
      endOfSchedule: schedule.schedulingDate,
      recurrence: schedule.recurrence,
      schedulingClass: schedule.schedulingClass
    });
  }

  update(schedule: ScheduleModel): Observable<any>{
    return this.http.put<any>(BASE_URL_API + (!GlobalVariables.isAdmin ? URL_BARBER : '') + URL_SCHEDULING + ROUTE_UPDATE, {
      schedulingId: schedule.schedulingId,
      client: schedule.client,
      class: schedule.schedulingClass,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate,
      endOfSchedule: schedule.schedulingDate,
      recurrence: schedule.recurrence,
      schedulingClass: schedule.schedulingClass
    });
  }

  getAll(): Observable<any> {
    return this.getManySchedule(1, 50);
  }

  getManySchedule(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + (!GlobalVariables.isAdmin ? URL_BARBER : '') + URL_SCHEDULING + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  getScheduleById(id: number): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_GETBYID, {
      params: {
        schedulingId: id
      }
    });
  }

  deleteAllSchedules(): Observable<any> {
    return this.http.delete(BASE_URL_API + URL_SCHEDULING + ROUTE_DELETEALL);
  }

}
