import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { DashboardService } from '../../../../Services/Dashboard.service';
import { GlobalVariables } from '../../../../Helpers/GlobalVariables';
import { Chart, registerables } from './../../../../../../node_modules/chart.js';
Chart.register(...registerables);


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
  static _historic: any[] = [];

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
  get historic() {
    return DashboardSectionComponent._historic;
  }


  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  loadedTopClients = false;
  loadedTopEmployees = false;
  loadedTopServices = false;
  loadedSchedulesInPeriod = false;
  loadedHistoric = false;

  get isDashboardLoaded() {
    return DashboardSectionComponent._historic.length == 0 && DashboardSectionComponent._topEmployees.length == 0 && DashboardSectionComponent._topClients.length == 0 && DashboardSectionComponent._schedulesInPeriod.length == 0;
  }

  constructor(
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    if (this.isDashboardLoaded)
      this.loadProperties();
    else
      this.createIncomeChart();
  }

  static clearProperties() {
    DashboardSectionComponent._topEmployees =
      DashboardSectionComponent._topClients =
      DashboardSectionComponent._historic =
        DashboardSectionComponent._schedulesInPeriod = [];

    DashboardSectionComponent._startDate = moment().add(-7, 'days').format('YYYY-MM-DD');
    DashboardSectionComponent._endDate = moment().format('YYYY-MM-DD');

    DashboardSectionComponent._top5 = 'func';
    DashboardSectionComponent._quickDate = 'week';
  }

  loadProperties() {
    this.getSchedulesInPeriod();
    this.getHistoric();
    this.getTop5Clients();
    this.getTop5Employees();
    this.getTop5Services();
  }

  getHistoric() {
    DashboardSectionComponent._historic = [];
    this.loadedHistoric = true;
    return;
    const startDate = 1;//moment(this.startDate).utc(true).toISOString();
    const endDate = 10;//moment(this.endDate).utc(true).toISOString();

    const API_CALL = this.dashboard.getHistoric(startDate, endDate);

    API_CALL.subscribe({
      next: (data: any) => {
        DashboardSectionComponent._historic = [...data.data];
        console.log(data)
        this.loadedHistoric = true;
        this.requestSucceded();
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getSchedulesInPeriod() {
    const startDate = moment(this.startDate).utc(true).toISOString();
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true).toISOString();

    const API_CALL = this.dashboard.getManySchedulingByDate(startDate, endDate);

    API_CALL.subscribe({
      next: (data: any) => {
        const schedules: ScheduleModel[] = data.data;
        DashboardSectionComponent._schedulesInPeriod = schedules.map((element: any) => {
          return new ScheduleModel(element)
        });
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
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true).toISOString();
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
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true).toISOString();

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
    const endDate = moment(this.endDate).hour(23).minute(59).utc(true).toISOString();

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
    if (this.loadedSchedulesInPeriod && this.loadedTopClients && this.loadedTopEmployees && this.loadedTopServices && this.loadedHistoric) {
      LoaderComponent.SetOptions(false);
      this.createIncomeChart();
      this.loadedSchedulesInPeriod =
        this.loadedHistoric =
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

  createIncomeChart() {
    const ctx = document.getElementById('income-chart') as HTMLCanvasElement;
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
          label: 'R$',
          data: dataInChart,
          fill: true,
          backgroundColor: 'green',
          borderColor: 'green',
          pointBackgroundColor: 'white',
          tension: 0.25
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: 'black'
            }
          },
          y: {
            ticks: {
              color: 'black'
            },
            beginAtZero: true
          }
        },
        plugins: {
          title: {
              color: 'black',
              align: 'start',
              display: true,
              text: 'Receita',
              padding: {
                top: 0,
                bottom: 30
              }
          },
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
