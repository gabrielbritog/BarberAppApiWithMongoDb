import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel } from '../../../../Models/ClientModel';

@Component({
  selector: 'app-ClassDetails',
  templateUrl: './ClassDetails.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './ClassDetails.component.css']
})
export class ClassDetailsComponent implements OnInit {
  get selectedClass() {
    return GlobalVariables.selectedClass;
  }
  set selectedClass(value) {
    GlobalVariables.selectedClass = value;
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  searchValue = '';

  get clientList() {
    return GlobalVariables.schedules
    .map(p => p.client)
    .filter(p =>
      p.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      p.phone.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .filter((cName, index, self) => self.map(p => p.phone).includes(cName.phone, index + 1) === false)
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((b, a) => {
        if (this.selectedClass.clients.some(p => p == a))
          return 1;
        if (this.selectedClass.clients.some(p => p == b))
          return -1;

        return 0
      });

  }

  hasClient(client: ClientModel) {
    return this.selectedClass.clients.some(p => p == client);
  }

  addClientToClass(client: ClientModel) {
    if (this.selectedClass.clients.some(p => p == client))
      this.selectedClass.clients = this.selectedClass.clients.filter(p=> p !== client);
    else
      this.selectedClass.clients.push(client);

    console.log(this.selectedClass.clients);

  }

  constructor() { }

  ngOnInit() {
    if (!this.selectedClass)
      this.selectedClass = {
        name: 'Teste',
        clients: [],
        presence: [],
        date: ''
    }
  }

}
