import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import * as moment from 'moment';

@Component({
  selector: 'app-CalendarCard',
  templateUrl: './CalendarCard.component.html',
  styleUrls: ['./CalendarCard.component.scss']
})
export class CalendarCardComponent implements OnInit {

  thisWeek: moment.Moment[] = [];

  get currentDay() {
    return GlobalVariables.currentDay.format('YYYY-MM-DD');
  }

  set currentDay(value: any) {
    console.log(value);
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

  constructor() { }

  ngOnInit() {
    this.loadWeek()
  }

  setDay(element: moment.Moment) {
    GlobalVariables.currentDay = element;
  }

  loadWeek() {
    for (let index = 0; index < 7; index++) {
      this.thisWeek.push(moment().add(index, 'days'));
    }
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

}
