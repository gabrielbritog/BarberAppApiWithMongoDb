import { ServiceTypeService } from './../../Services/ServiceType.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { BarberService } from '../../Services/Barber.service';
import { BarberModel } from '../../Models/BarberModel';

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
    private barberService: BarberService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken()){
      this.router.navigateByUrl('/Login');
      return;
    }
    const userModel = this.tokenStorage.getUserModel();

    this.appLoaded = false;
    LoaderComponent.SetOptions(true);

    GlobalVariables.isAdmin = userModel.barberId == null;
    GlobalVariables.loadUserConfig(userModel.userConfig);
    GlobalVariables.currentSection = 0;

    GlobalVariables.FillProperties();
    this.getSchedules();
    this.getServiceTypes();
    this.getBarbers();
  }

  isAppLoaded() {
    let loadCondition = this.loadedBarbers && this.loadedSchedules && this.loadedSchedules;
    return loadCondition;
  };

  getSchedules() {
    this.schedulingService.getAllSchedule().subscribe({
      next: (data: any) => {
        let schedules: ScheduleModel[] = data.data.map((element: any) => new ScheduleModel(element));
        GlobalVariables.schedules = schedules;

        this.loadedSchedules = true;

        this.loadedFunction();
      },
      error: (err) => console.log(err.data.message)
    })
  }

  getServiceTypes() {
    this.serviceTypeService.getAllServiceType().subscribe({
      next: (data: any) => {
        let serviceTypes: ServiceTypeModel[] = data.data.map((element: any) => new ServiceTypeModel(element));
        GlobalVariables.serviceTypes = serviceTypes;

        this.loadedServiceTypes = true;

        this.loadedFunction();
      },
      error: (err) => console.log(err.data.message)
    })
  }

  getBarbers() {
    this.barberService.getAllBarbers().subscribe({
      next: (data: any) => {
        let barbers: BarberModel[] = data.data.map((element: any) => new BarberModel(element));
        GlobalVariables.barbers = barbers;

        this.loadedBarbers = true;

        this.loadedFunction();
      },
      error: (err) => console.log(err.data.message)
    })
  }

  loadedFunction() {
    if (!this.isAppLoaded() || this.appLoaded)
      return;
    const delay = 200;
    setTimeout(() => {
      LoaderComponent.SetOptions(false);

      if (GlobalVariables.isAdmin && GlobalVariables.barbers.length > 0)
        GlobalVariables.selectedBarber = GlobalVariables.barbers[0];
      else
        GlobalVariables.selectedBarber = undefined;

      if (GlobalVariables.barbers.length == 0)
        GlobalVariables.currentSection = 3;

      this.appLoaded = true;

    }, delay);
  }

}
