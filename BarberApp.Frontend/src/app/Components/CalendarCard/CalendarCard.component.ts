import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-CalendarCard',
  templateUrl: './CalendarCard.component.html',
  styleUrls: ['./CalendarCard.component.scss']
})
export class CalendarCardComponent implements OnInit {

  get currentMomentDay() {
    return GlobalVariables.currentDay;
  }

  get currentMonthDay() {
    return this.currentMomentDay.format('D');
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

  constructor() { }

  ngOnInit() {
  }

  nextDay() {
    GlobalVariables.currentDay = GlobalVariables.currentDay.add(1, 'days');
  }

  previousDay() {
    GlobalVariables.currentDay = GlobalVariables.currentDay.subtract(1, 'days');
  }

}
