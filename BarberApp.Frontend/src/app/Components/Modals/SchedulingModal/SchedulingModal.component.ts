import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import * as moment from 'moment';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';

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
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          GlobalVariables.schedules.push(schedule);
          this.showModal = false;
          form.resetForm({
            date: this.currentDay
          });
        }, 20);
      },
      error: (err) => {
        console.log(err.message);
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          console.log(err.message);
        }, 20);
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
