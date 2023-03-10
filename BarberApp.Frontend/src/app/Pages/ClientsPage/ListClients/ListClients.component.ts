import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-ListClients',
  templateUrl: './ListClients.component.html',
  styleUrls: ['../../../Shared/Styles/baseSection.scss',  './ListClients.component.scss']
})
export class ListClientsComponent implements OnInit {

  searchValue = "";

  get clientList() {
    return GlobalVariables.schedules
    .map(p => p.client)
    .filter(p =>
      p.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      p.phone.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .filter((cName, index, self) => self.map(p => p.phone).includes(cName.phone, index + 1) === false)
    .sort((a, b) => a.name.localeCompare(b.name));
  };

  constructor() { }

  ngOnInit() {
  }

}
