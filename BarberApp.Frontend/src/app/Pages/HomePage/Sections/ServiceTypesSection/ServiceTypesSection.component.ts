import { GlobalVariables } from './../../../../Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../Services/SchedulingService.service';
import { ServiceTypeModel } from '../../../../Models/ServiceTypeModel';

@Component({
  selector: 'app-ServiceTypesSection',
  templateUrl: './ServiceTypesSection.component.html',
  styleUrls: ['./ServiceTypesSection.component.scss']
})
export class ServiceTypesSectionComponent implements OnInit {

  get allServiceTypes() {
    return GlobalVariables.serviceTypes;
  };

  set allServiceTypes(value) {
    GlobalVariables.serviceTypes = value;
  };

  constructor() { }

  ngOnInit() {
  }

  formatToMoney(value: string | number) {
    return `R$${value},00`;
  }

  newServiceType() {
    GlobalVariables.showServiceTypeModal = true;
  }



}
