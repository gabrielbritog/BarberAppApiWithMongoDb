import { GlobalVariables } from './../../../Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderComponent } from '../../Loader/Loader.component';
import { ServiceTypeModel } from '../../../Models/ServiceTypeModel';
import { ServiceTypeService } from 'src/app/Services/ServiceType.service';

@Component({
  selector: 'app-ServiceTypeModal',
  templateUrl: './ServiceTypeModal.component.html',
  styleUrls: ['../baseModal.scss', './ServiceTypeModal.component.scss']
})
export class ServiceTypeModalComponent implements OnInit {

  serviceModel = new ServiceTypeModel();

  get showModal() {
    return GlobalVariables.showServiceTypeModal;
  };

  set showModal(value) {
    GlobalVariables.showServiceTypeModal = value;
  };

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  constructor(private serviceTypeService: ServiceTypeService) { }

  ngOnInit() {
    this.serviceModel = new ServiceTypeModel(GlobalVariables.editServiceType);
  }

  get formatedMoney() {
    return this.serviceModel.valueService.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  set formatedMoney(value) {
    this.serviceModel.valueService = parseFloat(value);
  }

  onSubmit(form: NgForm) {
    let serviceType = new ServiceTypeModel(form.value);
    serviceType.serviceTypeId = this.isEditModal ? this.serviceModel.serviceTypeId : serviceType.serviceTypeId;

    let index = this.isEditModal? GlobalVariables.serviceTypes.indexOf(GlobalVariables.editServiceType!) : -1;

    const apiCall = this.isEditModal ? this.serviceTypeService.updateServiceType(serviceType) : this.serviceTypeService.registerServiceType(serviceType);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.serviceTypes.push(data.data);
          else
            GlobalVariables.serviceTypes[index] = new ServiceTypeModel(data.data);

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

  onCancel() {
    this.showModal = false;
  }

}
