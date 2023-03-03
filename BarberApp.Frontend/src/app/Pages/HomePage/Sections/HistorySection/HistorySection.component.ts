import { GlobalVariables } from './../../../../Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-HistorySection',
  templateUrl: './HistorySection.component.html',
  styleUrls: ['../baseSection.scss', './HistorySection.component.scss']
})
export class HistorySectionComponent implements OnInit {

  searchValue = '';

  get schedules() {
    const today = moment().format('L');
    const todayTime = moment().format('LT');
    const filteredSchedules = GlobalVariables.schedules
      .filter(p => p.client.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                  p.date.includes(this.searchValue) ||
                  p.serviceType.some(p=>p.nameService.includes(this.searchValue)))
      .filter(p => p.date < today || (p.date == today && p.time < todayTime))
      .sort((n1, n2) => n2.schedulingDate.localeCompare(n1.schedulingDate));

    return !GlobalVariables.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId);
  }

  constructor() { }

  ngOnInit() {
  }

}
