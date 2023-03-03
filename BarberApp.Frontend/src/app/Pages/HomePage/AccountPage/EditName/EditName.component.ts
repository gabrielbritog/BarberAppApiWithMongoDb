import { Component, OnInit } from '@angular/core';
import { IFormInput } from '../../../../Components/FormInput/IFormInput';
import { TokenStorageService } from '../../../../Services/token-storage.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../Services/User.service';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-EditName',
  templateUrl: './EditName.component.html',
  styleUrls: ['../AccountPage.component.scss','./EditName.component.scss']
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
