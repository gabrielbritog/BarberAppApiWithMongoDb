import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['../baseSection.scss', './SchedulesSection.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SchedulesSectionComponent implements OnInit {

  showAvailable = true;
  showFilled = true;

  get isBlocked() {
    if (GlobalVariables.isAdmin && GlobalVariables.barbers.length == 0)
      return true;

    return false;
  }

  get barberList() {
    return GlobalVariables.barbers;
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  get selectedBarber() {
    return GlobalVariables.selectedBarber;
  }

  set selectedBarber(value) {
    GlobalVariables.selectedBarber = value;
  }

  get isTodayDate() {
    const currentDay = GlobalVariables.currentDay.format('L');
    const today = moment().format('L');
    return currentDay === today;
  }

  get showModal() {
    return GlobalVariables.showScheduleModal;
  }

  get currentDaySchedules() {
    const currentDay = GlobalVariables.currentDay.format('L');
    const filteredSchedules = GlobalVariables.schedules
      .filter(p => p.date === currentDay)
      .sort((n1, n2) => n1.time.localeCompare(n2.time));
    return !this.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === this.selectedBarber?.barberId);
  }

  constructor() { }

  ngOnInit() {
  }

  newSchedule() {
    GlobalVariables.showScheduleModal = true;
  }

  get schedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    const currentDaySchedules = this.currentDaySchedules;
    const currentTime = moment().format('HH:mm');
    const filledTimes: any = {};
    const filteredSchedules = [];

    for (const schedule of currentDaySchedules) {
      filledTimes[schedule.time] = true;
    }

    for (const emptySchedule of emptySchedulesTemplate) {
      let newSchedule = emptySchedule;

      const existingSchedule = currentDaySchedules.find(schedule => schedule.time === newSchedule.time);

      if (existingSchedule) {
        newSchedule = existingSchedule;
      }

      // if (this.isTodayDate && newSchedule.time < currentTime) {
      //   continue;
      // }

      if (!this.showAvailable && !filledTimes[newSchedule.time]) {
        continue;
      }

      if (!this.showFilled && filledTimes[newSchedule.time]) {
        continue;
      }

      filteredSchedules.push(newSchedule);
    }

    return filteredSchedules;
  }

  updateSchedulesList() {
    GlobalVariables.getEmptySchedulesBase();
  }
}
