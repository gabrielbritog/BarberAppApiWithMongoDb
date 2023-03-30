import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { ServiceTypeService } from 'src/app/Services/api/ServiceType.service';

@Component({
  selector: 'app-NewService',
  templateUrl: './NewService.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './NewService.component.scss']
})
export class NewServiceComponent implements OnInit {

  serviceModel = new ServiceTypeModel();
  hideModal = false;

  modalInputs: IFormInput[] = [
    {
      id: 'nameService',
      label: 'Nome',
      type: 'text',
      value: ''
    },
    {
      id: 'valueService',
      label: 'Valor',
      type: 'text',
      value: '',
      currency: true
    },
    {
      id: 'duration',
      label: 'Duração em minutos',
      type: 'tel',
      value: GlobalVariables.intervalTimeMinutes
    }
  ]

  get showModal() {
    return GlobalVariables.showServiceTypeModal;
  };

  set showModal(value) {
    GlobalVariables.showServiceTypeModal = value;
  };

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  constructor(
    private serviceTypeService: ServiceTypeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.serviceModel = new ServiceTypeModel(GlobalVariables.editServiceType);

    if (this.isEditModal){
      this.modalInputs[0].value = this.serviceModel.nameService;
      this.modalInputs[1].value = this.serviceModel.valueService.toString();
      this.modalInputs[2].value = this.serviceModel.duration;
    }
  }


  onSubmit(form: NgForm) {
    let serviceType = new ServiceTypeModel(form.value);
    if (GlobalVariables.isAdmin)
      serviceType.barberId = GlobalVariables.selectedBarber?.barberId;
    serviceType.serviceTypeId = this.isEditModal ? this.serviceModel.serviceTypeId : serviceType.serviceTypeId;
    serviceType.duration = form.value.duration.toString();

    let index = this.isEditModal? GlobalVariables.serviceTypes.indexOf(GlobalVariables.editServiceType!) : -1;

    const apiCall = this.isEditModal ? this.serviceTypeService.updateServiceType(serviceType) : this.serviceTypeService.registerServiceType(serviceType);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        console.log(data.message)
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.serviceTypes.push(data.data);
          else
            GlobalVariables.serviceTypes[index] = new ServiceTypeModel(data.data);

          this.onCancel();
          form.resetForm();
        }, 20);
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          console.log(err.message);
        }, 20);
      }
    })
  }

  onCancel() {
    this.router.navigateByUrl('/Services');
  }

}
