import { GlobalVariables } from './../../../../Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../Services/SchedulingService.service';
import { ServiceTypeModel } from '../../../../Models/ServiceTypeModel';

@Component({
  selector: 'app-ServiceTypesSection',
  templateUrl: './ServiceTypesSection.component.html',
  styleUrls: ['../baseSection.scss', './ServiceTypesSection.component.scss']
})
export class ServiceTypesSectionComponent implements OnInit {

  get showModal() {
    return GlobalVariables.showServiceTypeModal;
  }

  get allServiceTypes() {
    return GlobalVariables.serviceTypes;
  };

  set allServiceTypes(value) {
    GlobalVariables.serviceTypes = value;
  };

  constructor() { }

  ngOnInit() {
  }

  newServiceType() {
    GlobalVariables.showServiceTypeModal = true;
  }

}
