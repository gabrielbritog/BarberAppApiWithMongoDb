import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { DashboardService } from '../../../../Services/Dashboard.service';

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

  static topClients: any[] = [];
  static topEmployees: any[] = [];
  static topServices: any[] = [];
  static schedulesInPeriod: ScheduleModel[] = [];

  loadedTopClients = false;
  loadedTopEmployees = false;
  loadedTopServices = false;
  loadedSchedulesInPeriod = false;

  get isDashboardLoaded() {
    return DashboardSectionComponent.topEmployees.length == 0 && DashboardSectionComponent.topClients.length == 0 && DashboardSectionComponent.schedulesInPeriod.length == 0;
  }

  constructor(
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    if (this.isDashboardLoaded)
      this.loadProperties();
  }

  static clearProperties() {
    DashboardSectionComponent.topEmployees =
      DashboardSectionComponent.topClients =
      DashboardSectionComponent.schedulesInPeriod = [];

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
        console.log(data.data);
        DashboardSectionComponent.schedulesInPeriod = data.data;
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
        console.log(data.data);
        DashboardSectionComponent.topClients = data.data;
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
        console.log(data.data);
        DashboardSectionComponent.topEmployees = data.data;
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
        console.log(data.data);
        DashboardSectionComponent.topServices = data.data;
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
