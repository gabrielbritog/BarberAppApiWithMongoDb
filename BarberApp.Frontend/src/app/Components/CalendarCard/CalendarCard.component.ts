import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import * as moment from 'moment';

@Component({
  selector: 'app-CalendarCard',
  templateUrl: './CalendarCard.component.html',
  styleUrls: ['./CalendarCard.component.scss']
})
export class CalendarCardComponent implements OnInit {

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

  weekdays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
  ]

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
  ]

  constructor() { }

  ngOnInit() {
  }

  nextDay() {
    GlobalVariables.currentDay = GlobalVariables.currentDay.add(1, 'days');
  }

  previousDay() {
    GlobalVariables.currentDay = GlobalVariables.currentDay.subtract(1, 'days');
  }

  openDatepicker() {
    const datePickerInput = document.getElementById('datepicker') as HTMLInputElement;
    datePickerInput.click();
  }

}
