import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-EditPassword',
  templateUrl: './EditPassword.component.html',
  styleUrls: ['../../../Shared/Styles/basePage.scss', './EditPassword.component.css']
})
export class EditPasswordComponent implements OnInit {

  password: IFormInput = {
    id: 'userPassword',
    label: 'Senha Atual',
    type: 'password',
    value: ''
  };

  newPassword: IFormInput = {
    id: 'password',
    label: 'Nova Senha',
    type: 'password',
    value: ''
  };

  confirmPassword: IFormInput = {
    id: 'confirmPassword',
    label: 'Confirmar Senha',
    type: 'password',
    value: ''
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    return;
    const API_CALL = this.userService.updatePassword(form.value);

    API_CALL.subscribe({
      next: (data: any) => {
        console.log(data);
        LoaderComponent.SetOptions(false, true, true);
        this.tokenStorage.saveUser(data.data);
        setTimeout(() => {
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
