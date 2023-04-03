import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { UserService } from 'src/app/Services/user/User.service';

@Component({
  selector: 'app-EditPhone',
  templateUrl: './EditPhone.component.html',
  styleUrls: ['../../../Styles/basePage.scss', './EditPhone.component.css']
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
        this.tokenStorage.saveUser(data.data);
        this.router.navigateByUrl('/Account');
      }
    })
  }

}
