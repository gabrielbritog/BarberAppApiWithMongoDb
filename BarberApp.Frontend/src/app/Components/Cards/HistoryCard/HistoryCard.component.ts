import { ScheduleModel } from './../../../Models/ScheduleModel';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-HistoryCard',
  templateUrl: './HistoryCard.component.html',
  styleUrls: ['../baseCard.scss','./HistoryCard.component.scss']
})
export class HistoryCardComponent implements OnInit {

  @Input('model') scheduleModel = new ScheduleModel();

  get formatedDate() {
    const dotNetDate = moment.utc(this.scheduleModel.schedulingDate).locale('pt-br');
    const todayDateDiff = moment().locale('pt-br').diff(dotNetDate, 'hours');
    const formatedDate = dotNetDate.format('D MMM');

    if (todayDateDiff < 24)
      return 'Hoje';

    if (todayDateDiff >= 24 && todayDateDiff < 48)
      return 'Ontem';

    return formatedDate.toUpperCase();
  }
  get formatedMoney() { return this.scheduleModel.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

  constructor() { }

  ngOnInit() {
  }



}
