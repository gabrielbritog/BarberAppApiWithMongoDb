import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../Services/SchedulingService.service';
import { ServiceTypeModel } from '../../../../Models/ServiceTypeModel';

@Component({
  selector: 'app-ServiceTypesSection',
  templateUrl: './ServiceTypesSection.component.html',
  styleUrls: ['./ServiceTypesSection.component.scss']
})
export class ServiceTypesSectionComponent implements OnInit {

  allServiceTypes: ServiceTypeModel[] = [];

  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {
  }

  getAllServiceTypes() {
    this.schedulingService.getAllServiceType().subscribe({
      next: (serviceTypes: ServiceTypeModel[]) => {
        this.allServiceTypes = serviceTypes;
      },
      error: (err) => {
        console.log(err.data.message);
      }
    })
  }

}
