import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../../Helpers/GlobalVariables';
import { ScheduleModel } from '../../../../Models/ScheduleModel';
import { UserModel } from 'src/app/Models/UserModel';

@Component({
  selector: 'app-ClientListSection',
  templateUrl: './ClientListSection.component.html',
  styleUrls: ['./ClientListSection.component.scss']
})
export class ClientListSectionComponent implements OnInit {

  searchValue = "";

  get clientList() {
    return GlobalVariables.schedules
    .map(p => new UserModel({ firstName: p.client.name, phoneNumber: p.client.phone}))
    .filter(p => p.firstName != "")
    .filter(p =>
      p.firstName.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .filter((cName, index, self) => self.map(p => p.firstName).includes(cName.firstName, index + 1) === false)
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
  };

  constructor() { }

  ngOnInit() {
  }

}
