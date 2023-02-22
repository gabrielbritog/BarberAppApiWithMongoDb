import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../Components/Loader/Loader.component';
import { GlobalVariables } from '../Helpers/GlobalVariables';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';

// IP DA MÁQUINA
const MACHINE_IP = GlobalVariables.MACHINE_IP;
// const BASE_URL_API = 'http://localhost:5066/api/'
const BASE_URL_API = `http://${MACHINE_IP}:5066/api/`
const URL_SERVICETYPE = 'ServiceType/'
const ROUTE_REGISTER = 'Register'
const ROUTE_GETMANY = 'GetMany'
const ROUTE_GETBYID = 'GetById/'
const ROUTE_UPDATE = 'Update'

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private http: HttpClient) { }

  registerServiceType(serviceType: ServiceTypeModel): Observable<any> {
    LoaderComponent.SetOptions(true);
    return this.http.post(BASE_URL_API + URL_SERVICETYPE + ROUTE_REGISTER, {
      nameService: serviceType.nameService,
      valueService: serviceType.valueService
    });
  }

  updateServiceType(serviceType: ServiceTypeModel): Observable<any>{
    return this.http.put<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_UPDATE, {
      serviceTypeId: serviceType.serviceTypeId,
      nameService: serviceType.nameService,
      valueService: serviceType.valueService,
      on: serviceType.on
    });
  }

  getAllServiceType(): Observable<any> {
    return this.getManyServiceType(1, 50);
  }

  getManyServiceType(skip: number = 1, take: number = 10): Observable<any> {
    LoaderComponent.SetOptions(true);
    return this.http.get<any>(BASE_URL_API + URL_SERVICETYPE + ROUTE_GETMANY, {
      params: {
        start: skip,
        count: take
      }
    });
  }
}
