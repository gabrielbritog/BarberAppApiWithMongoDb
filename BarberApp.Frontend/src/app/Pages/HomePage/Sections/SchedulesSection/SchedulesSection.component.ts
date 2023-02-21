import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['./SchedulesSection.component.scss']
})
export class SchedulesSectionComponent implements OnInit {

  get isTodayDate() {
    return GlobalVariables.currentDay.format('L') == moment().format('L');
  }

  get showModal() {
    return GlobalVariables.showScheduleModal;
  }

  get currentDaySchedules() {
    var result = GlobalVariables.schedules
                .filter(p => p.date == GlobalVariables.currentDay.format('L'))
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

  get schedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    let currentDaySchedules = this.currentDaySchedules;
    let schedules: ScheduleModel[] = [];

    for (let index = 0; index < emptySchedulesTemplate.length; index++) {
      let newSchedule = new ScheduleModel({
        date: GlobalVariables.currentDay.format('YYYY-MM-DD'),
        time: emptySchedulesTemplate[index].time
      })

      let schedule = currentDaySchedules.find(p => p.time == newSchedule.time);

      if (schedule)
        newSchedule = schedule;

      schedules.push(newSchedule);
    }

    if (this.isTodayDate)
      schedules = schedules.filter(p=> p.time >=  moment().format('HH:mm'))

    return schedules;
  }
}
