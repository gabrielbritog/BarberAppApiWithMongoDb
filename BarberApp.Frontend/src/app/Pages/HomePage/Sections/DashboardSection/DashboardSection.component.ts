import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { DashboardService } from '../../../../Services/Dashboard.service';
import { GlobalVariables } from '../../../../Helpers/GlobalVariables';
import { Chart, registerables } from './../../../../../../node_modules/chart.js';
import { ClientModel } from '../../../../Models/ClientModel';
import { BarberModel } from '../../../../Models/BarberModel';
import { ServiceTypeModel } from '../../../../Models/ServiceTypeModel';
import { TokenStorageService } from '../../../../Services/token-storage.service';
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
  static _topServices: TopService[] = [];
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

  get totalInPeriod() {
    return this.schedulesInPeriod.map(p=>p.total?? 0).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }


  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  loadedTopClients = false;
  loadedTopEmployees = false;
  loadedTopServices = false;
  loadedSchedulesInPeriod = false;

  static isDashboardLoaded = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    if (!DashboardSectionComponent.isDashboardLoaded)
      this.loadProperties();
    else{
      this.createIncomeChart();
      this.createSchedulesChart();
    }
  }

  static clearProperties() {
    DashboardSectionComponent._topEmployees =
      DashboardSectionComponent._topClients =
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
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true).toISOString();

    const API_CALL = this.dashboard.getManySchedulingByDate(startDate, endDate);

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
        this.loadedSchedulesInPeriod = true;

        this.getTop5Clients();
        this.getTop5Employees();
        this.getTop5Services();
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTop5Clients() {
    const schedules = this.schedulesInPeriod;
    const topClients: TopClient[] = [];

    schedules.forEach(p => {
      let topClient: TopClient = {
        client: p.client,
        count: 1,
        totalValue: p.total ?? 0
      };
      const topClientInArray = topClients.find(p=> p.client.phone === topClient.client.phone)

      if (!topClientInArray){
        topClients.push(topClient);
      }
      else{
        topClientInArray.count++;
        topClientInArray.totalValue += topClient.totalValue;
      }
    });

    DashboardSectionComponent._topClients = topClients.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        if (a.totalValue > b.totalValue) return -1;
        if (a.totalValue < b.totalValue) return 1;

        return 0;
      }).slice(0, 10);
    this.loadedTopClients = true;
    return;
  }

  getTop5Employees() {
    const schedules = this.schedulesInPeriod;
    const topEmployees: TopEmployee[] = [];

    schedules.forEach(p => {
      const barberById = GlobalVariables.employees.find(d => d.barberId === p.barberId);
      let topEmployee: TopEmployee = {
        employee: barberById!,
        count: 1,
        totalValue: p.total ?? 0
      };

      const topEmployeeInArray = topEmployees.find(d=> d.employee.barberId === topEmployee.employee.barberId)

      if (!topEmployeeInArray){
        topEmployees.push(topEmployee);
      }
      else{
        topEmployeeInArray.count++;
        topEmployeeInArray.totalValue += topEmployee.totalValue;
      }
    });

    DashboardSectionComponent._topEmployees = topEmployees.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        if (a.totalValue > b.totalValue) return -1;
        if (a.totalValue < b.totalValue) return 1;

        return 0;
      });
    this.loadedTopEmployees = true;
    return;
  }

  getTop5Services() {
    const schedules = this.schedulesInPeriod;
    const topServices: TopService[] = [];

    schedules.forEach(p => {
      p.serviceType.forEach(service => {
        let topService: TopService = {
          service: service,
          count: 1,
          totalValue: service.valueService
        };

        const topServiceInArray = topServices.find(d=> d.service.serviceTypeId === topService.service.serviceTypeId)

        if (!topServiceInArray){
          topServices.push(topService);
        }
        else{
          topServiceInArray.count++;
          topServiceInArray.totalValue += topService.totalValue;
        }
      })
    });

    DashboardSectionComponent._topServices = topServices.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        if (a.totalValue > b.totalValue) return -1;
        if (a.totalValue < b.totalValue) return 1;

        return 0;
      }).splice(0, 5);
    this.loadedTopServices = true;
    return;
  }

  requestSucceded() {
    if (this.loadedSchedulesInPeriod && this.loadedTopClients && this.loadedTopEmployees && this.loadedTopServices) {
      LoaderComponent.SetOptions(false);
      this.createIncomeChart();
      this.createSchedulesChart();
      this.loadedSchedulesInPeriod =
        this.loadedTopClients =
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

  createIncomeChart() {
    const startDate = moment(this.startDate);
    const endDate = moment(this.endDate).hour(23).minute(59);
    const diffDates = endDate.diff(startDate, 'days');
    const diffDatesInMonths = endDate.diff(startDate, 'months');
    const diffDatesInYears = endDate.diff(startDate, 'years');
    const labelsInChart: string[] = [];
    const dataInChart: number[] = [];


    if (diffDatesInMonths <= 1){
      for (let index = 0; index <= diffDates; index++) {
        const currentDate = moment(this.startDate).add(index, 'days');
        const filteredSchedules = this.schedulesInPeriod.filter(p => p.date == currentDate.format('MM/DD/YYYY'));
        const totalFromSchedules = filteredSchedules.map(p => p.total!).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.format('DD/MM'));
      }
    }
    else if (diffDatesInMonths <= 12) {
      for (let index = 0; index <= diffDatesInMonths; index++) {
        const currentDate = moment(this.startDate).add(index, 'months');

        const filteredSchedules = this.schedulesInPeriod
          .filter(p =>
            p.date.includes(currentDate.format('MM/')) &&
            p.date.includes(currentDate.format('YYYY')));
        const totalFromSchedules = filteredSchedules.map(p => p.total!).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.locale('pt-br').format('MMM'));
      }
    }
    else {
      for (let index = 0; index <= diffDatesInYears; index++) {
        const currentDate = moment(this.startDate).add(index, 'years');

        const filteredSchedules = this.schedulesInPeriod
          .filter(p =>
            p.date.includes(currentDate.format('YYYY')));
        const totalFromSchedules = filteredSchedules.map(p => p.total!).reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.format('YYYY'));
      }
    }


    const chartExist = Chart.getChart('income-chart');
    if (chartExist != undefined)
      chartExist.destroy();


    new Chart('income-chart', {
      type: 'line',
      data: {
        labels: labelsInChart,
        datasets: [{
          data: dataInChart,
          backgroundColor: 'white',
          borderColor: 'white',
          pointRadius: 0,
          tension: 0.5
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              display: false,
              color: 'black'
            }
          },
          y: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              display: false,
              color: 'black'
            },
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            top: -1,
            right: 0,
            left: -10,
            bottom: -7
          }
        },
        plugins: {
          legend: {
              display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = '';

                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                }

                return label;
              }
            }
          }
        }
      }
    });
  }

  createSchedulesChart() {
    const startDate = moment(this.startDate);
    const endDate = moment(this.endDate).hour(23).minute(59);
    const diffDates = endDate.diff(startDate, 'days');
    const diffDatesInMonths = endDate.diff(startDate, 'months');
    const diffDatesInYears = endDate.diff(startDate, 'years');
    const labelsInChart: string[] = [];
    const dataInChart: number[] = [];


    if (diffDatesInMonths <= 1){
      for (let index = 0; index <= diffDates; index++) {
        const currentDate = moment(this.startDate).add(index, 'days');
        const filteredSchedules = this.schedulesInPeriod.filter(p => p.date == currentDate.format('MM/DD/YYYY'));
        const totalFromSchedules = filteredSchedules.length;

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.format('DD/MM'));
      }
    }
    else if (diffDatesInMonths <= 12) {
      for (let index = 0; index <= diffDatesInMonths; index++) {
        const currentDate = moment(this.startDate).add(index, 'months');

        const filteredSchedules = this.schedulesInPeriod
          .filter(p =>
            p.date.includes(currentDate.format('MM/')) &&
            p.date.includes(currentDate.format('YYYY')));
        const totalFromSchedules = filteredSchedules.length;

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.locale('pt-br').format('MMM'));
      }
    }
    else {
      for (let index = 0; index <= diffDatesInYears; index++) {
        const currentDate = moment(this.startDate).add(index, 'years');

        const filteredSchedules = this.schedulesInPeriod
          .filter(p =>
            p.date.includes(currentDate.format('YYYY')));
        const totalFromSchedules = filteredSchedules.length;

        dataInChart.push(totalFromSchedules);
        labelsInChart.push(currentDate.format('YYYY'));
      }
    }


    const chartExist = Chart.getChart('schedules-chart');
    if (chartExist != undefined)
      chartExist.destroy();


    new Chart('schedules-chart', {
      type: 'line',
      data: {
        labels: labelsInChart,
        datasets: [{
          data: dataInChart,
          backgroundColor: 'white',
          borderColor: 'white',
          pointRadius: 0,
          tension: 0.5
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              display: false,
              color: 'black'
            }
          },
          y: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              display: false,
              color: 'black'
            },
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            top: 2,
            right: 0,
            left: -10,
            bottom: -7
          }
        },
        plugins: {
          legend: {
              display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = '';

                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                }

                return label;
              }
            }
          }
        }
      }
    });
  }

  onCancel() {

  }

}
