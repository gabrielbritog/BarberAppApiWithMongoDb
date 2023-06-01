import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';

@Component({
  selector: 'app-ListService',
  templateUrl: './ListService.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './ListService.component.scss']
})
export class ListServiceComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  get servicesTable() {
    const _tables: DefaultTable = {
      titles: ['Nome', 'Valor', 'Duração'],
      objects: [],
      buttons: [{
        label: 'Editar',
        fontawesomeIcon: 'fa-solid fa-pen-to-square',
        bgColor: 'main',
        onClick: (event: any) => this.editService(event),
      }],
      // onClick: (event: any) => this.editService(event)
    }

    GlobalVariables.serviceTypes
      .filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId)
      .forEach((service, i) => {
        _tables.objects.push({
          object: {
            name: service.nameService,
            value: this.formatToMoney(service.valueService),
            duration: `${service.duration} min.`,
            id: service.serviceTypeId
          },
          // fontawesomeIcon: "fa-solid fa-pen",
          // imgUrl: client.urlImage,
          // iconBgColor: AppColors.main
        })
      })

    return _tables;
  }

  formatToMoney(value: number | string) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  editService(event: any) {
    if (!event.object.id)
      return;

    const serviceModel = GlobalVariables.serviceTypes.find(p => p.serviceTypeId === event.object.id);
    if (!serviceModel)
      return;

    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editServiceType = serviceModel;
    this.router.navigateByUrl('/Services/Edit')

  }

}
