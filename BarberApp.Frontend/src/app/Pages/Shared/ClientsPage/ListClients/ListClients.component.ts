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
      titles: ['Nome'],
      objects: [],
      buttons: [
        {
          label: 'Detalhes',
          fontawesomeIcon: 'fa-solid fa-arrow-up-right-from-square',
          bgColor: 'main',
          onClick: (event: any) => this.editClient(event, 'Edit')
        },
        {
          label: 'Avaliação',
          fontawesomeIcon: 'fa-solid fa-file-lines',
          bgColor: 'main',
          onClick: (event: any) => this.editClient(event, 'Avaliation')
        },
        {
          label: 'Aulas',
          fontawesomeIcon: 'fa-solid fa-chart-line',
          bgColor: 'main',
          onClick: (event: any) => this.editClient(event, 'History')
        },
      ]
      // onClick: (event: any) => this.editClient(event)
    }

    GlobalVariables.clients.forEach((client, i) => {
      _tables.objects.push({
        object: {
          name: client.name,
          id: client.clientId
        },
        // fontawesomeIcon: "fa-brands fa-whatsapp",
        // imgUrl: client.urlImage,
        // iconBgColor: AppColors.green
      })
    })

    return _tables;
  }

  editClient(event: any, route: string) {
    if (!event.object?.id)
      return;

    this.router.navigateByUrl(`/Clients/${route}/${event.object.id}`);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
