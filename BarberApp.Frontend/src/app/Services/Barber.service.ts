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
const URL_SCHEDULING = 'Scheduling/'
const URL_SERVICETYPE = 'ServiceType/'

const ROUTE_REGISTER = 'Register'
const ROUTE_LOGIN = 'Login'
const ROUTE_UPDATE = 'Update'
const ROUTE_GETMANY = 'GetMany'
const ROUTE_DELETEALL = 'DeleteAll'


@Injectable({
  providedIn: 'root'
})
export class BarberService {

  constructor(private http: HttpClient) { }

  register(credentials: BarberModel | any): Observable<any> {
    return this.http.post<any>(BASE_URL_API + ROUTE_REGISTER, {
      companyName: credentials.associatedCompany,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      urlImage: credentials.urlImage,
      password: credentials.password,
      phoneNumber: credentials.phoneNumber,
      workingDays: credentials.workingDays
    });
  }

  login(credentials: BarberModel | any): Observable<any> {
    return this.http.post<any>(BASE_URL_API + ROUTE_LOGIN, {
      email: credentials.lastName,
      password: credentials.password
    });
  }

  update(credentials: BarberModel | any): Observable<any> {
    return this.http.put<any>(BASE_URL_API + ROUTE_UPDATE, {
      barberId: credentials.barberId,
      userId: credentials.userId,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.lastName,
      urlImage: credentials.urlImage,
      password: credentials.password,
      phoneNumber: credentials.phoneNumber,
      workingDays: credentials.workingDays
    });
  }

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

  ////////////////////////////////////////////////////
  //                                                //
  //                   SCHEDULING                   //
  //                                                //
  ////////////////////////////////////////////////////

  registerScheduling(schedule: ScheduleModel | any): Observable<any> {
    return this.http.post<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_REGISTER, {
      client: schedule.client,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate,
      endOfSchedule: schedule.endOfSchedule
    });
  }

  updateScheduling(schedule: ScheduleModel | any): Observable<any> {
    return this.http.put<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_UPDATE, {
      schedulingId: schedule.schedulingId,
      client: schedule.client,
      serviceType: schedule.serviceType,
      schedulingDate: schedule.schedulingDate,
      endOfSchedule: schedule.endOfSchedule
    });
  }

  getManyScheduling(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SCHEDULING + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

  ////////////////////////////////////////////////////
  //                                                //
  //                  SERVICE TYPE                  //
  //                                                //
  ////////////////////////////////////////////////////

  registerServiceType(serviceType: ServiceTypeModel | any): Observable<any> {
    return this.http.post<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_REGISTER, {
      serviceTypeId: serviceType.serviceTypeId,
      nameService: serviceType.nameService,
      valueService: serviceType.valueService,
      duration: serviceType.duration
    });
  }

  updateServiceType(serviceType: ServiceTypeModel | any): Observable<any> {
    return this.http.put<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_UPDATE, {
      barberId: serviceType.barberId,
      serviceTypeId: serviceType.serviceTypeId,
      nameService: serviceType.nameService,
      valueService: serviceType.valueService,
      duration: serviceType.duration,
      on: serviceType.on
    });
  }

  getManyServiceType(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }

}
