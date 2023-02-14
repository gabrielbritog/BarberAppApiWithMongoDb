import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ScheduleModel } from '../../../../Models/ScheduleModel';

@Component({
  selector: 'app-TodaySection',
  templateUrl: './TodaySection.component.html',
  styleUrls: ['./TodaySection.component.scss']
})
export class TodaySectionComponent implements OnInit {

  get todaySchedules() {
    var result = GlobalVariables.schedules
                .filter(p => moment(p.date).format('L') == moment().format('L'))
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
