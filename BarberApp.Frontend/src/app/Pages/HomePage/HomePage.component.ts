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
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    this.appLoaded = false;
    LoaderComponent.SetOptions(true);

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
      error: (err) => {
        console.log(err);
      }
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
      error: (err) => {
        console.log(err.data.message);
      }
    })
  }

  getBarbers() {
    this.barberService.getAllBarbers().subscribe({
      next: (data: any) => {
        let barbers: BarberModel[] = data.data.map((element: any) => new BarberModel(element));
        GlobalVariables.barbers = barbers;

        this.loadedBarbers = true;
        console.log(data)

        this.loadedFunction();
      },
      error: (err) => {
        console.log(err.data.message);
      }
    })
  }

  loadedFunction() {
    if (this.isAppLoaded() == false || this.appLoaded)
      return;
    setTimeout(() => {
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
            this.appLoaded = true;
        }, 200);
    }, 200);
  }

}
