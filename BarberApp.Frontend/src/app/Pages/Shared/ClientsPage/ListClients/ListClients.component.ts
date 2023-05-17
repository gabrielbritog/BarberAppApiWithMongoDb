import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';

@Component({
  selector: 'app-ListClients',
  templateUrl: './ListClients.component.html',
  styleUrls: ['../../../Styles/baseSection.scss',  './ListClients.component.scss']
})
export class ListClientsComponent implements OnInit {

  get clientsTable() {
    const _tables: DefaultTable = {
      titles: ['Nome', 'Telefone'],
      objects: [],
      onClick: (event: any) => this.editClient(event)
    }

    GlobalVariables.clients.forEach((client, i) => {
      _tables.objects.push({
        object: {
          name: client.name,
          phone: client.phone,
          id: client.clientId
        },
        // fontawesomeIcon: "fa-brands fa-whatsapp",
        // imgUrl: client.urlImage,
        // iconBgColor: AppColors.green
      })
    })

    return _tables;
  }

  editClient(event: any) {
    if (!event.object.id)
      return;

    this.router.navigateByUrl(`/Clients/Edit/${event.object.id}`);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
