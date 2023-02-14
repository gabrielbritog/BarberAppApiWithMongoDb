import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import * as moment from 'moment';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['./SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {

  get showModal() {
    return GlobalVariables.showScheduleModal;
  };

  set showModal(value) {
    GlobalVariables.showScheduleModal = value;
  };

  get today(){return moment().format('YYYY-MM-DD')};

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    GlobalVariables.schedules.push(new ScheduleModel(form.value));
    this.showModal = false;
    form.resetForm({
      date: this.today
    });
  }

  onCancel(form: NgForm) {
    this.showModal = false;
    form.resetForm({
      date: this.today
    });
  }

}
