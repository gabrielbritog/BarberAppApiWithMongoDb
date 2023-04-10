import { ClientModel } from './../../../Models/ClientModel';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editSchedule() {
    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = this.scheduleModel;

    this.router.navigateByUrl('/Schedules/Details')
  }

  newSchedule() {
    GlobalVariables.modalAsEdit = false;
    GlobalVariables.editSchedule = this.scheduleModel;

    this.router.navigateByUrl('/Schedules/Details')
  }

}
