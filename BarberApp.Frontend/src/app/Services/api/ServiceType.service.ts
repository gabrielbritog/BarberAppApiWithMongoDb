import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';

// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
// const BASE_URL_API = 'http://localhost:5066/api/'
const URL_BARBER = 'Barber/'
const ROUTE_REGISTER = 'ServiceType/Register'
const ROUTE_GETMANY = 'ServiceType/GetMany'
const ROUTE_GETBYID = 'ServiceType/GetById/'
const ROUTE_UPDATE = 'ServiceType/Update'

const BASE_URL_API = `${MACHINE_IP}/api/`

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private http: HttpClient) { }

  registerServiceType(serviceType: ServiceTypeModel): Observable<any> {
    return this.http.post(BASE_URL_API+ (!GlobalVariables.isAdmin ? URL_BARBER : '') + ROUTE_REGISTER, {
      barberId: serviceType.barberId,
      nameService: serviceType.nameService,
      valueService: serviceType.valueService,
      duration: serviceType.duration
    });
  }

  updateServiceType(serviceType: ServiceTypeModel): Observable<any>{
    return this.http.put<any>(BASE_URL_API+ (!GlobalVariables.isAdmin ? URL_BARBER : '') + ROUTE_UPDATE, {
      barberId: serviceType.barberId,
      serviceTypeId: serviceType.serviceTypeId,
      nameService: serviceType.nameService,
      valueService: serviceType.valueService,
      duration: serviceType.duration,
      on: serviceType.on
    });
  }

  getAllServiceType(): Observable<any> {
    return this.getManyServiceType(1, 50);
  }

  getManyServiceType(skip: number = 1, take: number = 10): Observable<any> {
    return this.http.get<any>(BASE_URL_API + (!GlobalVariables.isAdmin ? URL_BARBER : '') + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }
}
