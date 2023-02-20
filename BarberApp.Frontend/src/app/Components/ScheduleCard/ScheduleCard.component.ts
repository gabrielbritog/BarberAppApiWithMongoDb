import { Component, Input, OnInit } from '@angular/core';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

@Component({
  selector: 'app-ScheduleCard',
  templateUrl: './ScheduleCard.component.html',
  styleUrls: ['./ScheduleCard.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input('scheduleModel') scheduleModel!: ScheduleModel;
  @Input('isSchedule') isSchedule = true;
  @Input('showDate') showDate = false;
  @Input('showPhone') showPhone = false;
  @Input('showOptions') showOptions = true;

  expand = false;

  constructor() { }

  ngOnInit() {
  }

  editSchedule() {
    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = this.scheduleModel;

    GlobalVariables.showScheduleModal = true;
  }

}
