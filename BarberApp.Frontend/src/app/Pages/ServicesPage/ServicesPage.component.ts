import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-ServicesPage',
  templateUrl: './ServicesPage.component.html',
  styleUrls: ['../../Shared/Styles/baseSection.scss','./ServicesPage.component.scss']
})
export class ServicesPageComponent implements OnInit {

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
