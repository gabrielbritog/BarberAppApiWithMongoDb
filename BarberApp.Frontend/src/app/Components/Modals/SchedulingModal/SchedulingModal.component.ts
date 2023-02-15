import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import * as moment from 'moment';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';

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

  get currentDay(){return GlobalVariables.currentDay.format('YYYY-MM-DD')};

  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    var schedule = new ScheduleModel(form.value);
    this.schedulingService.registerSchedule(schedule).subscribe({
      next: (data: any) => {
        console.log(data);
        GlobalVariables.schedules.push(schedule);
        this.showModal = false;
        form.resetForm({
          date: this.currentDay
        });
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  onCancel(form: NgForm) {
    this.showModal = false;
    form.resetForm({
      date: this.currentDay
    });
  }

}
