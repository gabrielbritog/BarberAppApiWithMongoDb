import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { BarberModel } from '../../../Models/BarberModel';
import { LoaderComponent } from '../../Loader/Loader.component';
import { TokenStorageService } from '../../../Services/token-storage.service';
import { AuthService } from '../../../Services/Auth.service';

@Component({
  selector: 'app-BarberModal',
  templateUrl: './BarberModal.component.html',
  styleUrls: ['../baseModal.scss', './BarberModal.component.scss']
})
export class BarberModalComponent implements OnInit {

  barberModel = new BarberModel();

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  get showModal() {
    return GlobalVariables.showBarberModal;
  };

  set showModal(value) {
    GlobalVariables.showBarberModal = value;
  };

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const barberForm = form.value;
    let barber = new BarberModel(barberForm);
    barber.associatedCompany = this.tokenStorage.getUserModel().companyName;

    let index = this.isEditModal? GlobalVariables.barbers.indexOf(GlobalVariables.editBarber!) : -1;

    const apiCall = this.isEditModal ? this.authService.updateBarber(barber) : this.authService.registerBarber(barber);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        console.log(data);
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.barbers.push(new BarberModel(data.data));
          else
            GlobalVariables.barbers[index] = new BarberModel(data.data);
          this.showModal = false;
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
    this.showModal = false;
  }

}
