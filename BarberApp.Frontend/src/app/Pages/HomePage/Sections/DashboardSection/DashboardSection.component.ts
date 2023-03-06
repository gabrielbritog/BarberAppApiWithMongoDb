import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { DashboardService } from '../../../../Services/Dashboard.service';


export interface TopClient{
  schedulingCount: number;
  name: string;
  phone: string;
}
export interface TopEmployee{
  name: string;
  total: string;
}

@Component({
  selector: 'app-DashboardSection',
  templateUrl: './DashboardSection.component.html',
  styleUrls: ['../../../../Shared/Styles/baseSection.scss', './DashboardSection.component.scss']
})
export class DashboardSectionComponent implements OnInit {

  static _quickDate = 'week';
  get quickDate() {
    return DashboardSectionComponent._quickDate;
  }
  set quickDate(value) {
    DashboardSectionComponent._quickDate = value;
  }

  static _top5 = 'func';
  get top5() {
    return DashboardSectionComponent._top5;
  }
  set top5(value) {
    DashboardSectionComponent._top5 = value;
  }

  static _startDate = moment().add(-7, 'days').format('YYYY-MM-DD');
  get startDate() {
    return DashboardSectionComponent._startDate;
  }
  set startDate(value) {
    DashboardSectionComponent._startDate = value;
  }

  static _endDate = moment().format('YYYY-MM-DD');
  get endDate() {
    return DashboardSectionComponent._endDate;
  }
  set endDate(value) {
    DashboardSectionComponent._endDate = value;
  }

  static _topClients: TopClient[] = [];
  static _topEmployees: TopEmployee[] = [];
  static _topServices: any[] = [];
  static _schedulesInPeriod: ScheduleModel[] = [];

  get topClients() {
    return DashboardSectionComponent._topClients;
  }
  get topEmployees() {
    return DashboardSectionComponent._topEmployees;
  }
  get topServices() {
    return DashboardSectionComponent._topServices;
  }
  get schedulesInPeriod() {
    return DashboardSectionComponent._schedulesInPeriod;
  }

  loadedTopClients = false;
  loadedTopEmployees = false;
  loadedTopServices = false;
  loadedSchedulesInPeriod = false;

  get isDashboardLoaded() {
    return DashboardSectionComponent._topEmployees.length == 0 && DashboardSectionComponent._topClients.length == 0 && DashboardSectionComponent._schedulesInPeriod.length == 0;
  }

  constructor(
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    if (this.isDashboardLoaded)
      this.loadProperties();
  }

  static clearProperties() {
    DashboardSectionComponent._topEmployees =
      DashboardSectionComponent._topClients =
      DashboardSectionComponent._schedulesInPeriod = [];

    DashboardSectionComponent._startDate = moment().add(-7, 'days').format('YYYY-MM-DD');
    DashboardSectionComponent._endDate = moment().format('YYYY-MM-DD');

    DashboardSectionComponent._top5 = 'func';
    DashboardSectionComponent._quickDate = 'week';
  }

  loadProperties() {
    this.getSchedulesInPeriod();
    this.getTop5Clients();
    this.getTop5Employees();
    this.getTop5Services();
  }

  getSchedulesInPeriod() {
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).utc(true).toISOString();

    const API_CALL = this.dashboard.getManySchedulingByDate(startDate, endDate);

    API_CALL.subscribe({
      next: (data: any) => {
        DashboardSectionComponent._schedulesInPeriod = [...data.data];
        this.loadedSchedulesInPeriod = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTop5Clients() {
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).utc(true).toISOString();

    const API_CALL = this.dashboard.getTopClients(5, startDate, endDate);


    API_CALL.subscribe({
      next: (data: any) => {
        DashboardSectionComponent._topClients = [...data.data];
        this.loadedTopClients = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTop5Employees() {
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).utc(true).toISOString();

    const API_CALL = this.dashboard.getTopEmployees(5, startDate, endDate);


    API_CALL.subscribe({
      next: (data: any) => {
        DashboardSectionComponent._topEmployees = [...data.data.map((p: string) => {
          const stringResponse = p.split(':');
          return { name: stringResponse[0], total: stringResponse[1] };
        })];
        this.loadedTopEmployees = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTop5Services() {
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).utc(true).toISOString();

    const API_CALL = this.dashboard.getTopServices(5, startDate, endDate);


    API_CALL.subscribe({
      next: (data: any) => {
        DashboardSectionComponent._topServices = [...data.data];
        this.loadedTopServices = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  requestSucceded() {
    if (this.loadedSchedulesInPeriod && this.loadedTopClients && this.loadedTopEmployees && this.loadedTopServices) {
      LoaderComponent.SetOptions(false);
      this.loadedSchedulesInPeriod =
        this.loadedTopClients =
        this.loadedTopEmployees =
        this.loadedTopServices = false;
    }
  }



  dateChanged() {
    this.quickDate = '';
    console.log(DashboardSectionComponent._schedulesInPeriod);
    console.log(DashboardSectionComponent._topEmployees);
    console.log(DashboardSectionComponent._topClients);
    console.log(DashboardSectionComponent._topServices);

    this.loadProperties();
  }

  setQuickDate(quickDate: string) {
    if (this.quickDate === quickDate)
      return;
    if (quickDate === 'month'){
      this.quickDate = 'month';
      this.startDate = moment().add(-1, 'month').format('YYYY-MM-DD');
      this.endDate = moment().format('YYYY-MM-DD');
    }
    else if (quickDate === 'year') {
      this.quickDate = 'year';
      this.startDate = moment().add(-1, 'year').format('YYYY-MM-DD');
      this.endDate = moment().format('YYYY-MM-DD');
    }
    else {
      this.quickDate = 'week';
      this.startDate = moment().add(-1, 'week').format('YYYY-MM-DD');
      this.endDate = moment().format('YYYY-MM-DD');
    }

    this.loadProperties();
  }

  setTop5(top5: string) {
    this.top5 = top5;
  }

  onCancel() {

  }

}
