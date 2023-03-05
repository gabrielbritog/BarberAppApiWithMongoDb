import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../Services/token-storage.service';
import { UserModel } from '../../Models/UserModel';
import { Router } from '@angular/router';
import { UserService } from '../../Services/User.service';

@Component({
  selector: 'app-AccountPage',
  templateUrl: './AccountPage.component.html',
  styleUrls: ['../../Shared/Styles/basePage.scss','./AccountPage.component.scss']
})
export class AccountPageComponent implements OnInit {

  inputText = "";

  get headerUrl() {
    let headerText = 'Conta '
    switch (this.router.url) {
      case '/Account/Name':
        headerText += '/ Editar Nome';
        break;
      case '/Account/Email':
        headerText += '/ Editar Email';
        break;
      case '/Account/Phone':
        headerText += '/ Editar Celular';
        break;
      case '/Account/Password':
        headerText += '/ Alterar Senha';
        break;

    }

    return headerText;
  }

  get userInfo() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const userModel = this.tokenStorage.getUserModel();

    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    if (!GlobalVariables.appLoaded)
      this.router.navigateByUrl('/Home');

  }

  onSubmit(form: NgForm) {

    const userModel = new UserModel(form.value);

    const apiCall = this.isAdmin ? this.userService.update(userModel) : this.userService.updateBarber(userModel);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false, true, true);
        this.tokenStorage.saveUser(data.data);
        this.router.navigateByUrl('/Home');
      },
      error: (err) => {
        LoaderComponent.SetOptions(false, false, true);
        console.log(err);
      }
    })

  }

  onCancel() {
    if (this.router.url == '/Account')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/Account');
  }

  removeUndefinedStrings(value: any) {
    return value == 'Não definido' ? '' : value;
  }

}
