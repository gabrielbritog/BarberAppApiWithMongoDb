import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel } from '../../../../Models/ClientModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListClients',
  templateUrl: './ListClients.component.html',
  styleUrls: ['../../../Styles/baseSection.scss',  './ListClients.component.scss']
})
export class ListClientsComponent implements OnInit {

  searchValue = "";

  get clientList() {
    return GlobalVariables.clients
    .filter(p =>
      p.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      p.phone.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .filter((cName, index, self) => self.map(p => p.phone).includes(cName.phone, index + 1) === false)
    .sort((a, b) => a.name.localeCompare(b.name));
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  newClient() {
    this.router.navigateByUrl('/Clients/New');
  }

}
