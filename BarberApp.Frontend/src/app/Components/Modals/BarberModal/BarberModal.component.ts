import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { BarberModel } from '../../../Models/BarberModel';
import { LoaderComponent } from '../../Loader/Loader.component';
import { TokenStorageService } from '../../../Services/token-storage.service';
import { AuthService } from '../../../Services/Auth.service';
import { UserService } from '../../../Services/User.service';
import { IFormInput } from '../../FormInput/IFormInput';

@Component({
  selector: 'app-BarberModal',
  templateUrl: './BarberModal.component.html',
  styleUrls: ['../baseModal.scss', './BarberModal.component.scss']
})
export class BarberModalComponent implements OnInit {

  barberModel = new BarberModel();
  hideModal = false;

  modalInputs: IFormInput[] = [
    {
      id: 'firstName',
      label: 'Nome',
      type: 'text',
      value: ''
    },
    {
      id: 'lastName',
      label: 'Sobrenome',
      type: 'text',
      value: ''
    },
    {
      id: 'phoneNumber',
      label: 'Celular',
      type: 'text',
      value: ''
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    },
    {
      id: 'password',
      label: 'Senha',
      type: 'password',
      value: '12345678'
    }
  ]

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  get showModal() {
    return GlobalVariables.showBarberModal;
  };

  set showModal(value) {
    GlobalVariables.showBarberModal = value;
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.barberModel = new BarberModel(GlobalVariables.editBarber);

    if (this.isEditModal){
      this.modalInputs[0].value = this.barberModel.firstName;
      this.modalInputs[1].value = this.barberModel.lastName;
      this.modalInputs[2].value = this.barberModel.phoneNumber?? '';
      this.modalInputs[3].value = this.barberModel.email;
    }
  }

  onSubmit(form: NgForm) {
    const barberForm = form.value;
    barberForm.associatedCompany = this.tokenStorage.getUserModel().companyName;
    barberForm.barberId = this.barberModel.barberId;
    barberForm.userId = this.barberModel.userId;
    let barber = new BarberModel(barberForm);

    let index = this.isEditModal? GlobalVariables.barbers.indexOf(GlobalVariables.editBarber!) : -1;

    const apiCall = this.isEditModal ? this.userService.updateBarber(barber) : this.authService.registerBarber(barber);

    apiCall.subscribe({
      next: (data: any) => this.successResponse(data, index, form),
      error: (err) => this.errorResponse(err)
    })
  }

  onCancel() {
    const animationDelay = 150;
    this.hideModal = true;
    setTimeout(() => this.showModal = false , animationDelay);
  }

  successResponse(data: any, index: number, form: NgForm) {
    LoaderComponent.SetOptions(false);
    console.log(data.message);
    setTimeout(() => {
      if (index < 0)
        GlobalVariables.barbers.push(new BarberModel(data.data));
      else
        GlobalVariables.barbers[index] = new BarberModel(data.data);

      if (GlobalVariables.barbers.length == 1)
        GlobalVariables.selectedBarber = GlobalVariables.barbers[0];
      this.onCancel();
      form.resetForm();
    }, 20);
  }

  errorResponse(err: any) {
    LoaderComponent.SetOptions(false);
    setTimeout(() => {
      console.log(err.message);
    }, 20);
  }

}
