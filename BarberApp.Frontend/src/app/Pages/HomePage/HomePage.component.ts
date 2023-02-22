import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit {

  get currentSection(){ return GlobalVariables.currentSection };

  loadedSchedules = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private schedulingService: SchedulingService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    GlobalVariables.FillProperties();
    this.getSchedules();
    this.getServiceTypes();
  }

  getSchedules() {
    this.schedulingService.getAllSchedule().subscribe({
      next: (data: any) => {
        console.log(data.data)
        let schedules: ScheduleModel[] = data.data.map((element: any) => new ScheduleModel(element));
        GlobalVariables.schedules = schedules;
        LoaderComponent.SetOptions(false);

        this.loadedSchedules = true;
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getServiceTypes() {
    this.schedulingService.getAllServiceType().subscribe({
      next: (data: any) => {
        let serviceTypes: ServiceTypeModel[] = data.data.map((element: any) => new ServiceTypeModel(element));
        GlobalVariables.serviceTypes = serviceTypes;
      },
      error: (err) => {
        console.log(err.data.message);
      }
    })
  }

}
