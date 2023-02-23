import { Component, Input, OnInit } from '@angular/core';
import { ServiceTypeModel } from '../../../Models/ServiceTypeModel';
import { SchedulingModalComponent } from '../../Modals/SchedulingModal/SchedulingModal.component';

@Component({
  selector: 'app-CarouselServiceTypes',
  templateUrl: './CarouselServiceTypes.component.html',
  styleUrls: ['../baseCarousel.scss', './CarouselServiceTypes.component.scss']
})
export class CarouselServiceTypesComponent implements OnInit {

  @Input() scheduleModal!: SchedulingModalComponent;

  expand = false;

  get serviceTypes() {
    return this.scheduleModal.serviceTypes;
  }

  hasService(serviceType: ServiceTypeModel): boolean {
    return this.scheduleModal.selectedServiceTypes.some(p => p.serviceTypeId === serviceType.serviceTypeId);
  }

  addToList(element: ServiceTypeModel) {
    if (this.hasService(element))
      this.scheduleModal.selectedServiceTypes = this.scheduleModal.selectedServiceTypes.filter(p => p.serviceTypeId != element.serviceTypeId);
    else
      this.scheduleModal.selectedServiceTypes.push(element);
  }

  constructor() { }

  ngOnInit() {
  }

}
