import { Component, Input, OnInit } from '@angular/core';
import { ScheduleModel } from '../../../Models/ScheduleModel';

@Component({
  selector: 'app-CarouselAvailableTime',
  templateUrl: './CarouselAvailableTime.component.html',
  styleUrls: ['../baseCarousel.scss', './CarouselAvailableTime.component.css' ]
})
export class CarouselAvailableTimeComponent implements OnInit {

  @Input() availableTime: ScheduleModel[] = [];

  selectedItem: ScheduleModel | undefined;

  constructor() { }

  ngOnInit() {
  }

  setCurrent(element: ScheduleModel) {
    console.log('criko')
    this.selectedItem = element;
  }

}
