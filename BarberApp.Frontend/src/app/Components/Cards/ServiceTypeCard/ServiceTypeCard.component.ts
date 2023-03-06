import { ServiceTypeModel } from '../../../Models/ServiceTypeModel';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ServiceTypeCard',
  templateUrl: './ServiceTypeCard.component.html',
  styleUrls: ['../baseCard.scss', './ServiceTypeCard.component.scss']
})
export class ServiceTypeCardComponent implements OnInit {

  @Input('model') serviceModel = new ServiceTypeModel();
  @Input('showOptions') showOptions = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  formatToMoney(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  editService() {
    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editServiceType = this.serviceModel;
    this.router.navigateByUrl('/Services/Edit')
  }

}
