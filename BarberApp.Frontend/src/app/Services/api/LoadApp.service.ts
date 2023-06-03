import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ClientService } from './Client.service';
import { EmployeeService } from './Employee.service';
import { SchedulingService } from './SchedulingService.service';
import { ServiceTypeService } from './ServiceType.service';
import { Router } from '@angular/router';
import { ClassesService } from './Classes.service';

@Injectable({
  providedIn: 'root'
})
export class LoadAppService {

  constructor(
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private serviceTypeService: ServiceTypeService,
    private schedulingService: SchedulingService,
    private classesService: ClassesService,
    private router: Router
  ) { }

  init() {
    const clients = this.clientService.getAll();
    const employees = this.employeeService.getAll();
    const serviceTypes = this.serviceTypeService.getAll();
    const schedules = this.schedulingService.getAll();
    const classes = this.classesService.getAll();

    return forkJoin([ clients, employees, serviceTypes, schedules, classes ]).pipe(
      map(([clients, employees, serviceTypes, schedules, classes]) => ({
        clients,
        employees,
        serviceTypes,
        schedules,
        classes
      }))
    );
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  setKey(key: AppKeys , value: any) {
    localStorage.setItem(AppKeys[key], JSON.stringify(value));
  }

  getKey(key: AppKeys) {
    return JSON.parse(localStorage.getItem(AppKeys[key])?? '{}');
  }

}

export enum AppKeys {
  SERVICES,
  CLIENTS,
  EMPLOYEES,
  CLASSES,
  SCHEDULES,
}
