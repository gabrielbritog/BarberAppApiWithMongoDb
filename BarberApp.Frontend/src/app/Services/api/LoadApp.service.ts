import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ClientService } from './Client.service';
import { EmployeeService } from './Employee.service';
import { SchedulingService } from './SchedulingService.service';
import { ServiceTypeService } from './ServiceType.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadAppService {

  constructor(
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private serviceTypeService: ServiceTypeService,
    private schedulingService: SchedulingService,
    private router: Router
  ) { }

  init() {
    const clients = this.clientService.getAll();
    const employees = this.employeeService.getAll();
    const serviceTypes = this.serviceTypeService.getAll();
    const schedules = this.schedulingService.getAll();

    return forkJoin([ clients, employees, serviceTypes, schedules ]).pipe(
      map(([clients, employees, serviceTypes, schedules]) => ({
        clients,
        employees,
        serviceTypes,
        schedules
      }))
    );
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

}
