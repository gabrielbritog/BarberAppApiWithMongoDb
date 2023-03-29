import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from './Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { EmployeeService } from './Services/api/Employee.service';
import { SchedulingService } from './Services/api/SchedulingService.service';
import { ServiceTypeService } from './Services/api/ServiceType.service';
import { TokenStorageService } from './Services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Barber-App';

  get displaySidebar() {
    const url = this.route.url;
    return url == '/Home' && GlobalVariables.showSidebar;
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private schedulingService: SchedulingService,
    private serviceTypeService: ServiceTypeService,
    private employeeService: EmployeeService,
    private route: Router
  ) {
    GlobalVariables.initServices(this.schedulingService, this.serviceTypeService, this.employeeService);
  }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      console.log('Caí aqui hein')
      this.route.navigateByUrl('/Login');
      return;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
