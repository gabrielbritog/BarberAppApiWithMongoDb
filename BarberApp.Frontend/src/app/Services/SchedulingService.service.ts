import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { GlobalVariables } from '../Helpers/GlobalVariables';


// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
// const BASE_URL_API = 'http://localhost:5066/api/'
const BASE_URL_API = `http://${MACHINE_IP}:5066/api/`
const URL_SCHEDULING = 'Scheduling/'
const ROUTE_DELETEALL= 'DeleteAll/'
const ROUTE_REGISTER = 'Register'
const ROUTE_GETMANY = 'GetMany'
const ROUTE_GETBYID = 'GetById/'
const ROUTE_UPDATE = 'Update'

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private http: HttpClient) { }

  registerSchedule(schedule: ScheduleModel): Observable<any> {
    return this.http.post<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_REGISTER, {
      client: schedule.client,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate
    });
  }

  updateSchedule(schedule: ScheduleModel): Observable<any>{
    return this.http.put<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_UPDATE, {
      schedulingId: schedule.schedulingId,
      client: schedule.client,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate
    });
  }

  getAllSchedule(): Observable<any> {
    return this.getManySchedule(1, 50);
  }

  getManySchedule(skip: number = 1, take: number = 10): Observable<any> {
    LoaderComponent.SetOptions(true);
    return this.http.get<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_GETMANY, {
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
