import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['../baseSection.scss', './SchedulesSection.component.scss']
})
export class SchedulesSectionComponent implements OnInit {

  showAvailable = true;
  showFilled = true;

  get barberList() {
    return GlobalVariables.barbers;
  }

  get isBarber() {
    return GlobalVariables.isBarberUser;
  }

  get selectedBarber() {
    return GlobalVariables.selectedBarber;
  }

  set selectedBarber(value) {
    GlobalVariables.selectedBarber = value;
  }

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

    if (!this.isBarber)
    result = result.filter(p=>p.barberId == this.selectedBarber?.barberId)

    return result;
  };

  constructor() { }

  ngOnInit() {
    if (this.isBarber)
      return;

    if (this.selectedBarber == null && GlobalVariables.barbers.length > 0)
      this.selectedBarber = GlobalVariables.barbers[0];
  }

  newSchedule() {
    GlobalVariables.showScheduleModal = true;
  }

  get schedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    const currentDaySchedules = this.currentDaySchedules;
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
      schedules = schedules.filter(p => p.time >= moment().format('HH:mm'));

    if (!this.showAvailable)
      schedules = schedules.filter(p => currentDaySchedules.map(b => b.time).includes(p.time));

    if (!this.showFilled)
      schedules = schedules.filter(p => !currentDaySchedules.map(b => b.time).includes(p.time));

    return schedules;
  }
}
