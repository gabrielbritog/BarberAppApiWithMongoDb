import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { UserService } from 'src/app/Services/user/User.service';

@Component({
  selector: 'app-EditName',
  templateUrl: './EditName.component.html',
  styleUrls: ['../../../Styles/basePage.scss', './EditName.component.scss']
})
export class EditNameComponent implements OnInit {

  get userModel() {
    const user = this.tokenStorage.getUserModel();
    return user;
  }

  firstNameInput: IFormInput = {
    id: 'firstName',
    label: 'Nome',
    type: 'text',
    value: this.userModel.firstName
  };

  lastNameInput: IFormInput = {
    id: 'lastName',
    label: 'Sobrenome',
    type: 'text',
    value: this.userModel.lastName
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.value.firstName == this.userModel.firstName &&
        form.value.lastName == this.userModel.lastName ) {
      this.toastr.warning('Nenhuma alteração feita.')
      return;
    }

    const API_CALL = this.userService.updateName(form.value);

    API_CALL.subscribe({
      next: (data: any) => {
        console.log(data);
        this.tokenStorage.saveUser(data.data);
        this.router.navigateByUrl('/Account');
      }
    })
  }

}
