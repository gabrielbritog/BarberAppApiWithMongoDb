import { GlobalVariables } from './../../../Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';
import { ServiceTypeModel } from '../../../Models/ServiceTypeModel';

@Component({
  selector: 'app-ServiceTypeModal',
  templateUrl: './ServiceTypeModal.component.html',
  styleUrls: ['./ServiceTypeModal.component.scss']
})
export class ServiceTypeModalComponent implements OnInit {

  get showModal() {
    return GlobalVariables.showServiceTypeModal;
  };

  set showModal(value) {
    GlobalVariables.showServiceTypeModal = value;
  };

  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    var serviceType = new ServiceTypeModel(form.value);
    this.schedulingService.registerServiceType(serviceType).subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          GlobalVariables.serviceTypes.push(serviceType);
          this.showModal = false;
          form.resetForm();
        }, 20);
      },
      error: (err) => {
        console.log(err.message);
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          console.log(err.message);
        }, 20);
      }
    })
  }

  onCancel(form: NgForm) {
    this.showModal = false;
  }

}
