import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { CardMiniInfoModel } from 'src/app/Components/Cards/card-mini-info/card-mini-info-model';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { BarberModel } from 'src/app/Models/BarberModel';
import { ClientModel } from 'src/app/Models/ClientModel';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { DashboardService } from 'src/app/Services/api/Dashboard.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
Chart.register(...registerables);

export interface TopClient{
  client: ClientModel;
  count: number;
  totalValue: number;
}
export interface TopEmployee{
  employee: BarberModel;
  count: number;
  totalValue: number;
}
export interface TopService{
  service: ServiceTypeModel;
  count: number;
  totalValue: number;
}

@Component({
  selector: 'app-DashboardSection',
  templateUrl: './DashboardSection.component.html',
  styleUrls: ['../../Styles/basePage.scss', './DashboardSection.component.scss']
})
export class DashboardSectionComponent implements OnInit {

  static _quickDate = 'week';
  get quickDate() {
    return DashboardSectionComponent._quickDate;
  }
  set quickDate(value) {
    DashboardSectionComponent._quickDate = value;
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

  infos: CardMiniInfoModel[] = [];

  static _BirthdaysOfTheMonth: ClientModel[] = [];
  static _schedulesInPeriod: ScheduleModel[] = [];
  static _schedulesInPreviousPeriod: ScheduleModel[] = [];

  get BirthdaysOfTheMonth() {
    return DashboardSectionComponent._BirthdaysOfTheMonth;
  }
  get schedulesInPeriod() {
    return DashboardSectionComponent._schedulesInPeriod;
  }
  get schedulesInPreviousPeriod() {
    return DashboardSectionComponent._schedulesInPreviousPeriod;
  }

  get totalInPeriod() {
    return this.schedulesInPeriod.map(p=>p.total?? 0).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }
  get totalInPreviousPeriod() {
    return this.schedulesInPreviousPeriod.map(p=>p.total?? 0).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }


  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  loaded_BirthdaysOfTheMonth = false;
  loadedTopEmployees = false;
  loadedTopServices = false;
  loadedSchedulesInPeriod = false;

  static isDashboardLoaded = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    this.loadProperties();
  }

  static clearProperties() {
    DashboardSectionComponent._BirthdaysOfTheMonth =
      DashboardSectionComponent._schedulesInPeriod = [];

    DashboardSectionComponent._startDate = moment().add(-7, 'days').format('YYYY-MM-DD');
    DashboardSectionComponent._endDate = moment().format('YYYY-MM-DD');

    DashboardSectionComponent._quickDate = 'week';
  }

  formatToMoney(value: number | string) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  loadProperties() {
    this.getSchedulesInPeriod();
  }

  getSchedulesInPeriod() {
    const startDate = moment(this.startDate).utc(true);
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true);

    console.log(startDate, endDate);
    const API_CALL = this.dashboard.getManySchedulingByDate(startDate.toISOString(), endDate.toISOString());

    API_CALL.subscribe({
      next: (data: any) => {
        const schedules: ScheduleModel[] = data.data;
        if (!this.isAdmin){
          DashboardSectionComponent._schedulesInPeriod = schedules
            .filter(p=>p.barberId === this.tokenStorage.getUserModel().barberId)
            .map((element: any) => {
              return new ScheduleModel(element)
            });
        } else {
          DashboardSectionComponent._schedulesInPeriod = schedules
            .map((element: any) => {
              return new ScheduleModel(element)
            });
        }

        this.getSchedulesInPreviousPeriod();
        this.getBirthdaysOfTheMonth();
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getBirthdaysOfTheMonth() {
    DashboardSectionComponent._BirthdaysOfTheMonth = GlobalVariables.clients.filter(p => {
      const birthdayAsMoment = moment(p.dateOfBirth);

      if (birthdayAsMoment.month() >= moment(this.startDate).month() &&
        birthdayAsMoment.month() <= moment(this.startDate).month())
        return p;

      return 0;
    }).sort((a, b) => {
      const birthdayAsMomentA = parseInt(moment(a.dateOfBirth).format('DD'));
      const birthdayAsMomentB = parseInt(moment(b.dateOfBirth).format('DD'));

      return birthdayAsMomentA - birthdayAsMomentB;
    })
  }

  getClientBirthday(client: ClientModel) {
    return moment(client.dateOfBirth).format('DD/MM');
  }

  getAbsenceOfClient(client: ClientModel) {
    const classesInPerid = this.schedulesInPeriod.map(p => p.class).filter(c=> c?.clientsId.includes(client.clientId?? ''));
    const presenceInPeriod = this.schedulesInPeriod.map(p => p.class).filter(c=> c?.presencesId.includes(client.clientId?? ''));

    return classesInPerid.length - presenceInPeriod.length;
  }

  getTotalAbsencesInPeriod() {
    const classesInPeriod = this.schedulesInPeriod.flatMap(p => p.class?.clientsId);
    const presenceInPeriod = this.schedulesInPeriod.flatMap(p => p.class?.presencesId);

    console.log(classesInPeriod, classesInPeriod.length)
    console.log(presenceInPeriod, presenceInPeriod.length)
  }

  getSchedulesInPreviousPeriod() {
    const startDate = moment(this.startDate).utc(true);
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true);
    const startEndDateDiff = endDate.diff(startDate);
    const previousStartDate = startDate.clone().add(-startEndDateDiff).utc(true);
    const previousEndDate = endDate.clone().add(-startEndDateDiff).utc(true);

    console.log('Previous period: ', previousStartDate.format('DD-MM-YYYY'), previousEndDate.format('DD-MM-YYYY'));

    const PREVIUS_API_CALL = this.dashboard.getManySchedulingByDate(previousStartDate.toISOString(), previousEndDate.toISOString());


    PREVIUS_API_CALL.subscribe({
      next: (data: any) => {
        const schedules: ScheduleModel[] = data.data;
        if (!this.isAdmin){
          DashboardSectionComponent._schedulesInPreviousPeriod = schedules
            .filter(p=>p.barberId === this.tokenStorage.getUserModel().barberId)
            .map((element: any) => {
              return new ScheduleModel(element)
            });
        } else {
          DashboardSectionComponent._schedulesInPreviousPeriod = schedules
            .map((element: any) => {
              return new ScheduleModel(element)
            });
        }

        this.infos = [];

        this.infos.push({
          infoTitle: 'Receita',
          currentValue: this.totalInPeriod,
          compareValue: this.totalInPreviousPeriod,
          isCurrency: true,
          showAsPercentage: true
        });
        this.infos.push({
          infoTitle: 'Agendamentos',
          currentValue: this.schedulesInPeriod.length,
          compareValue: this.schedulesInPreviousPeriod.length,
          roundValue: false
        });

        this.loadedSchedulesInPeriod = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  requestSucceded() {
    this.getTotalAbsencesInPeriod()
    if (this.loadedSchedulesInPeriod && this.loaded_BirthdaysOfTheMonth && this.loadedTopEmployees && this.loadedTopServices) {
      this.loadedSchedulesInPeriod =
        this.loaded_BirthdaysOfTheMonth =
        this.loadedTopEmployees =
        this.loadedTopServices = false;
      DashboardSectionComponent.isDashboardLoaded = true;
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

  onCancel() {

  }

}
