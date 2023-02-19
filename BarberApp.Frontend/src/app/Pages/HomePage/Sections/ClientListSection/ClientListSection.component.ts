import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../../Helpers/GlobalVariables';
import { ScheduleModel } from '../../../../Models/ScheduleModel';

@Component({
  selector: 'app-ClientListSection',
  templateUrl: './ClientListSection.component.html',
  styleUrls: ['./ClientListSection.component.scss']
})
export class ClientListSectionComponent implements OnInit {

  clientList: ScheduleModel[] = [];

  constructor() { }

  ngOnInit() {
    this.clientList = GlobalVariables.schedules
    .map(p => new ScheduleModel({ clientName: p.clientName }))
    .filter(p => p.clientName != null)
    .filter((cName, index, self) => self.map(p => p.clientName).includes(cName.clientName, index + 1) === false)
    .sort((a, b) => a.clientName.localeCompare(b.clientName));
  }

}
