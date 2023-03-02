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

  searchValue = '';

  get isBlocked() {
    if (GlobalVariables.isAdmin && GlobalVariables.barbers.length == 0)
      return true;

    return false;
  }

  get showModal() {
    return GlobalVariables.showServiceTypeModal;
  }

  get allServiceTypes() {
    const serviceTypes = GlobalVariables.serviceTypes
      .filter(p => p.nameService.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                   p.valueService.toString().includes(this.searchValue));
    if (GlobalVariables.isAdmin)
      return serviceTypes.filter(p=>p.barberId == GlobalVariables.selectedBarber?.barberId)

    return serviceTypes;
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
