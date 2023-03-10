import { ServiceTypeService } from './../../Services/ServiceType.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { EmployeeService } from '../../Services/Employee.service';
import { BarberModel } from '../../Models/BarberModel';
import { DashboardSectionComponent } from './Sections/DashboardSection/DashboardSection.component';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit {

  get currentSection(){ return GlobalVariables.currentSection };

  loadedSchedules = false;
  loadedServiceTypes = false;
  loadedBarbers = false;
  appLoaded = false;

  constructor(
      private tokenStorage: TokenStorageService,
      private schedulingService: SchedulingService,
      private serviceTypeService: ServiceTypeService,
      private barberService: EmployeeService,
      private router: Router
    ) {  }

  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/Login');
      return;
    }

    if (GlobalVariables.loadFromLocalStorage()) {
      this.appLoaded = true;
    } else {
      this.loadApp();
    }
  }

  loadApp() {
    DashboardSectionComponent.clearProperties();
    GlobalVariables.sidebarExpanded = false;
    LoaderComponent.SetOptions(true);

    GlobalVariables.init(this.schedulingService, this.serviceTypeService, this.barberService).subscribe({
      next: (data: any) => {
        this.loadedSchedules =
          this.loadedServiceTypes =
          this.loadedBarbers = true;

        this.loadedFunction();
      },
      error: (err) => {
        console.log('Algo deu errado');
        this.tokenStorage.signOut();
      }
    })
  }

  isAppLoaded() {
    let loadCondition = this.loadedBarbers && this.loadedServiceTypes && this.loadedSchedules;
    return loadCondition;
  }

  loadedFunction() {
    if (!this.isAppLoaded() || this.appLoaded)
      return;

    GlobalVariables.currentSection = 1;

    GlobalVariables.FillProperties();

    const delay = 200;
    setTimeout(() => {
      LoaderComponent.SetOptions(false);

      this.appLoaded = GlobalVariables.appLoaded = true;

      if (GlobalVariables.employees.length == 0)
        this.router.navigateByUrl('/Employees/New');
    }, delay);
  }

}
