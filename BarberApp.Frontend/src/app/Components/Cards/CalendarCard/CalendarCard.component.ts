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

  constructor(private schedulesService: SchedulingService) {
    this.loadWeek();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setDay(element: moment.Moment) {
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
    for (let index = 0; index < daysToLoad; index++) {
      this.thisWeek.push(moment().add(index, 'days'));
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
