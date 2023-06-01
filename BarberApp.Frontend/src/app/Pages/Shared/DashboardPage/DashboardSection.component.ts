import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CardMiniInfoModel } from 'src/app/Components/Cards/card-mini-info/card-mini-info-model';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { BarberModel } from 'src/app/Models/BarberModel';
import { ClientModel } from 'src/app/Models/ClientModel';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { DashboardService } from 'src/app/Services/api/Dashboard.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

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
  static _classesInPeriod: {
    date: string,
    time: string,
    className: string | undefined,
    clients: (ClientModel | undefined)[] | undefined,
    presence: (ClientModel | undefined)[] | undefined,
    absence: (ClientModel | undefined)[] | undefined,
  }[] = [];

  get BirthdaysOfTheMonth() {
    return DashboardSectionComponent._BirthdaysOfTheMonth;
  }

  get classesInPeriod() {
    return DashboardSectionComponent._classesInPeriod;
  }

  get schedulesInPeriod() {
    return DashboardSectionComponent._schedulesInPeriod;
  }
  get schedulesInPreviousPeriod() {
    return DashboardSectionComponent._schedulesInPreviousPeriod;
  }

  get AbsencesInPeriod() {
    const absencesInPeriod = this.classesInPeriod.flatMap(p => p.absence)
      .reduce((acc: {clientId?: string, clientName?: string, totalClasses: number, totalAbsences: number}[], current) => {
      const existingClient = acc.find(item => item.clientId === current?.clientId);
      if (existingClient) {
        existingClient.totalAbsences++;
      } else {
        acc.push({
          clientId: current?.clientId,
          clientName: current?.name,
          totalClasses: this.classesInPeriod.flatMap(p=>p.clients).filter(p=> p?.clientId === current?.clientId).length,
          totalAbsences: 1
        });
      }
      return acc;
      }, []);

    return absencesInPeriod;
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
    private dashboard: DashboardService,
    private router: Router
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
    const absences = this.schedulesInPeriod.map(p => p.class).filter(c=> c?.clientsId.includes(client.clientId?? '') && !c.presencesId.includes(client.clientId?? ''));

    return absences.length;
  }

  getClassesInPeriod() {
    const classesInPeriod = this.schedulesInPeriod.map(p => {
      return {
        date: p.date,
        time: p.time,
        className: p.class?.name,
        clients: p.class?.clientsId.map(clientId => GlobalVariables.clients.find(client => client.clientId === clientId)),
        presence: p.class?.presencesId.map(clientId => GlobalVariables.clients.find(client => client.clientId === clientId)),
        absence: p.class?.clientsId.filter(_client => !p.class?.presencesId.includes(_client)).map(clientId => GlobalVariables.clients.find(client => client.clientId === clientId)),
      }
    });

    DashboardSectionComponent._classesInPeriod = classesInPeriod;
  }

  // TABLES

  getAbsencesTable() {
    const absencesTable: DefaultTable = {
      titles: ['Nome do aluno', 'Aulas totais', 'Faltas'],
      objects: [],
      onClick: (event: any) => this.clientDetails(event)
    }

    this.AbsencesInPeriod.forEach((client, i) => {
      absencesTable.objects.push({
        object: {
          name: client.clientName,
          classes: client.totalClasses,
          absences: client.totalAbsences,
          id: client.clientId
        }
      })
    })

    return absencesTable;
  }

  getBirthdaysTable() {
    const absencesTable: DefaultTable = {
      titles: ['Nome do aluno', 'Aniversário'],
      objects: [],
      onClick: (event: any) => this.clientDetails(event)
    }

    this.BirthdaysOfTheMonth.forEach((client, i) => {
      absencesTable.objects.push({
        object: {
          name: client.name,
          birthday: moment(client.dateOfBirth).format('DD/MM/YYYY'),
          id: client.clientId
        }
      })
    })

    return absencesTable;
  }

  clientDetails(event: any) {
    if (!event.object.id)
      return;

    const clientModel = GlobalVariables.clients.find(p => p.clientId === event.object.id);
    if (!clientModel)
      return;

    this.router.navigateByUrl('/Clients/Edit/'+event.object.id)

  }

  getSchedulesInPreviousPeriod() {
    const startDate = moment(this.startDate).utc(true);
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true);
    const startEndDateDiff = endDate.diff(startDate);
    const previousStartDate = startDate.clone().add(-startEndDateDiff).utc(true);
    const previousEndDate = endDate.clone().add(-startEndDateDiff -1).utc(true);

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
    this.getClassesInPeriod();
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
