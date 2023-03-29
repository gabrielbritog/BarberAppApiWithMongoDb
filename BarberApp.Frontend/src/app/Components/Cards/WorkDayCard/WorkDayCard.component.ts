import { WorkingDays } from '../../../Models/WorkingDays';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-WorkDayCard',
  templateUrl: './WorkDayCard.component.html',
  styleUrls: ['../baseCard.scss','./WorkDayCard.component.scss']
})
export class WorkDayCardComponent implements OnInit {

  @Input() weekDay!: WorkingDays;
  constructor() {
  }

  ngOnInit() {
  }

}
