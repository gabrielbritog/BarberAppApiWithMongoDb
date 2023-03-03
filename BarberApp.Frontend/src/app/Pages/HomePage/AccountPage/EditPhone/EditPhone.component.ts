import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from '../../../../Services/User.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-EditPhone',
  templateUrl: './EditPhone.component.html',
  styleUrls: ['../AccountPage.component.scss','./EditPhone.component.css']
})
export class EditPhoneComponent implements OnInit {

  get userModel() {
    const user = this.tokenStorage.getUserModel();
    return user;
  }

  phoneInput: IFormInput = {
    id: 'phoneNumber',
    label: 'Celular',
    type: 'text',
    value: this.getNumbersInsideString().toString()
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  getNumbersInsideString(storedString: string = this.userModel.phoneNumber) {
    const numbersFound = storedString.match(/\d+/g);
    return numbersFound?? '';
  }

  onSubmit(form: NgForm) {

    if (form.value.phoneNumber == this.getNumbersInsideString()) {
      this.toastr.warning('Nenhuma alteração feita.')
      return;
    }
      

    const API_CALL = this.userService.updatePhone(form.value);

    API_CALL.subscribe({
      next: (data: any) => {
        console.log(data);
        LoaderComponent.SetOptions(false, true, true);
        this.tokenStorage.saveUser(data.data);
        setTimeout(() => {
          this.toastr.success('Alterações realizadas com sucesso.')
          this.router.navigateByUrl('/Account')
        }, LoaderComponent.timeoutOffset);
      },
      error: (err: any) => {
        console.log(err);
        LoaderComponent.SetOptions(false, false, true);
      }
    })
  }

}
