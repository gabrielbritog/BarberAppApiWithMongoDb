import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['./SchedulesSection.component.scss']
})
export class SchedulesSectionComponent implements OnInit {

  get isTodayDate() {
    return GlobalVariables.currentDay.format('L') >= moment().format('L');
  }

  get currentDaySchedules() {
    var result = GlobalVariables.schedules
                .filter(p => moment(p.date).format('L') == GlobalVariables.currentDay.format('L'))
                .sort((n1, n2) => {
                  if (n1.time > n2.time) {
                      return 1;
                  }
                  if (n1.time < n2.time) {
                      return -1;
                  }
                  return 0;
                });

    return result;
  };

  get morningSchedules() {
    return this.currentDaySchedules.filter(p=>p.time < "12:00");
  }

  get afternoonSchedules() {
    return this.currentDaySchedules.filter(p=>p.time >= "12:00" && p.time < "18:00");
  }

  get nightSchedules() {
    return this.currentDaySchedules.filter(p=>p.time > "18:00");
  }

  constructor() { }

  ngOnInit() {
  }

  newSchedule() {
    GlobalVariables.showScheduleModal = true;
  }

}
