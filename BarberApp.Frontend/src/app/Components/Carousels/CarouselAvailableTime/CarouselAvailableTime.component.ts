import { GlobalVariables } from './../../../Helpers/GlobalVariables';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { SchedulingModalComponent } from '../../Modals/SchedulingModal/SchedulingModal.component';

@Component({
  selector: 'app-CarouselAvailableTime',
  templateUrl: './CarouselAvailableTime.component.html',
  styleUrls: ['../baseCarousel.scss', './CarouselAvailableTime.component.scss' ]
})
export class CarouselAvailableTimeComponent implements OnInit {

  @Input() scheduleModal!: SchedulingModalComponent;

  expand = false;

  get availableTime() {
    return this.scheduleModal.availableSchedules;
  }

  get selectedTime() {
    return this.scheduleModal.currentTime;
  }

  set selectedTime(value) {
    this.scheduleModal.currentTime = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
