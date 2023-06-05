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

  getCardTitle() {
    const classModel = GlobalVariables.allClasses.find(p=> p.id === this.scheduleModel.schedulingClass?.classId)


    if (this.scheduleModel.schedulingClass)
      return 'Turma: ' + classModel?.name;
    if (this.scheduleModel.client)
      return 'Cliente: ' + this.scheduleModel.client.name;

    return ' ';
  }

  get isEmptyModel() {
    return !GlobalVariables.schedules.some(p => p.schedulingId === this.scheduleModel.schedulingId);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editSchedule() {
    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = this.scheduleModel;

    // this.router.navigateByUrl('/Schedules/Presence/'+this.scheduleModel.schedulingId)
    this.router.navigateByUrl('/Schedules/Details')
  }

  newSchedule() {
    GlobalVariables.modalAsEdit = false;
    GlobalVariables.editSchedule = this.scheduleModel;

    this.router.navigateByUrl('/Schedules/New')
  }

}
