import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['../../Styles/basePage.scss', './SchedulesSection.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SchedulesSectionComponent implements OnInit {

  showAvailable = true;
  showFilled = true;

  get isBlocked() {
    if (GlobalVariables.isAdmin && GlobalVariables.employees.length == 0)
      return true;

    return false;
  }

  get barberList() {
    return GlobalVariables.employees;
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
      .filter(p => {
        if (p.date === currentDay ||
          moment(p.date).diff(moment(currentDay), 'days') % p.recurrence.recurrencePeriods === 0) {
          return true;
        }
        return false;
      })
      .sort((n1, n2) => n1.time.localeCompare(n2.time));
    return !this.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === this.selectedBarber?.barberId);
  }

  constructor() { }

  ngOnInit() {
  }

  newSchedule() {
    GlobalVariables.showScheduleModal = true;
  }

  updateSchedulesList() {
    GlobalVariables.getEmptySchedulesBase();
  }

  get schedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    const currentDaySchedules = this.currentDaySchedules;
    const currentTime = moment().format('HH:mm');
    const filledTimes: any = {};
    const filteredSchedules: ScheduleModel[] = [];

    for (const schedule of currentDaySchedules) {
      filledTimes[schedule.time] = true;
    }

    for (const emptySchedule of emptySchedulesTemplate) {
      let newSchedule = emptySchedule;

      const existingSchedule = currentDaySchedules
        .find(schedule => newSchedule.time === schedule.time ||
          (newSchedule.time >= schedule.time &&
            newSchedule.time < schedule.endTime)
          );

      if (existingSchedule) {
        newSchedule = existingSchedule;
        if (filteredSchedules.includes(existingSchedule)) {
          continue;
        }
      }


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
}
