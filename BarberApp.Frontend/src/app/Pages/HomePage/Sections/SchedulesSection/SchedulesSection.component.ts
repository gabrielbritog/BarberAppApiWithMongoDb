import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['./SchedulesSection.component.scss']
})
export class SchedulesSectionComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  newSchedule() {
    GlobalVariables.showScheduleModal = true;
  }

}
