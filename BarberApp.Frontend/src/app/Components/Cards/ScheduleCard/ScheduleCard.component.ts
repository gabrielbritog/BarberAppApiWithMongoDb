import { ClientModel } from './../../../Models/ClientModel';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';

@Component({
  selector: 'app-ScheduleCard',
  templateUrl: './ScheduleCard.component.html',
  styleUrls: ['../baseCard.scss', './ScheduleCard.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input('model') scheduleModel = new ScheduleModel();
  @Input('showOptions') showOptions = true;

  get isEmptyModel() {
    return !this.scheduleModel?.client?.name ?? true;
  }

  constructor() { }

  ngOnInit() {
  }

  editSchedule() {
    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = this.scheduleModel;

    GlobalVariables.showScheduleModal = true;
  }

  newSchedule() {
    GlobalVariables.modalAsEdit = false;
    GlobalVariables.editSchedule = this.scheduleModel;

    GlobalVariables.showScheduleModal = true;
  }

}
