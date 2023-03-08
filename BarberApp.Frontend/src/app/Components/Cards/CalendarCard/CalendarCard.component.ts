import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import * as moment from 'moment';
import { SchedulingService } from '../../../Services/SchedulingService.service';

@Component({
  selector: 'app-CalendarCard',
  templateUrl: './CalendarCard.component.html',
  styleUrls: ['../baseCard.scss', './CalendarCard.component.scss']
})
export class CalendarCardComponent implements OnInit, AfterViewInit {

  thisWeek: moment.Moment[] = [];

  get LastDayOfWeek() {
    return moment().add(7, 'days').format('YYYY-MM-DD');
  }

  _datePicked?: moment.Moment;

  get datePicked() {
    return this._datePicked?.format('YYYY-MM-DD');
  }

  set datePicked(value) {
    if (value){
      this._datePicked = moment(value);
      this.currentDay = value;
      GlobalVariables.getEmptySchedulesBase();
    }
    else{
      this._datePicked = undefined;
      this.currentDay = moment();
    }
  }

  get currentDay() {
    return GlobalVariables.currentDay.format('YYYY-MM-DD');
  }

  set currentDay(value: any) {
    GlobalVariables.currentDay = moment(value);
  }

  get currentMomentDay() {
    return GlobalVariables.currentDay;
  }

  get currentMonthDay() {
    return this.currentMomentDay.format('D');
  }

  get currentMonth() {
    return this.months[this.currentMomentDay.month()];
  }

  get currentWeekDay() {
    return this.weekdays[this.currentMomentDay.day()];
  }

  get currentShortWeekDay() {
    return this.shortWeekdays[this.currentMomentDay.day()];
  }

  weekdays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
  ];

  shortWeekdays = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
  ];

  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  constructor(private schedulesService: SchedulingService) {
    this.loadWeek();
  }

  ngOnInit() {
    if (this.currentDay >= moment().add(7, 'days').format('YYYY-MM-DD'))
      this.datePicked = this.currentDay;
  }

  ngAfterViewInit() {
  }

  setDay(element: moment.Moment) {
    if (GlobalVariables.currentDay == element)
      return;
    this._datePicked = undefined;
    GlobalVariables.currentDay = element;
    GlobalVariables.getEmptySchedulesBase();

    this.scrollActiveIntoView();
  }

  scrollActiveIntoView() {
    const cardElement = document.getElementById(`card_${this.getFormatedMoment(GlobalVariables.currentDay)}`) as HTMLElement;

    if (!cardElement)
      return;

    cardElement.scrollIntoView({
      block: 'end'
    })
  }

  loadWeek() {
    const delay = 100;
    const daysToLoad = 7;
    let initialDay = moment();
    // if (initialDay.hours() > GlobalVariables.endTime)
    //   initialDay.add(1, 'days');
    for (let index = 0; index < daysToLoad; index++) {
      this.thisWeek.push(moment(initialDay).add(index, 'days'));
    }

    setTimeout(() => this.scrollActiveIntoView(), delay);
  }

  getMomentMonthDay(element: moment.Moment) {
    return element.format('D');
  }

  getMomentWeekDay(element: moment.Moment) {
    return this.shortWeekdays[element.day()];
  }

  getFormatedMoment(element: moment.Moment) {
    return element.format('YYYY-MM-DD');
  }

  deleteAll() {

    return;
    this.schedulesService.deleteAllSchedules().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error(err) {
        console.log(err);
      },
    })
  }



}
