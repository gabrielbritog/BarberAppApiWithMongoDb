import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserModel } from 'src/app/Models/UserModel';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { UserService } from 'src/app/Services/user/User.service';

@Component({
  selector: 'app-AccountPage',
  templateUrl: './AccountPage.component.html',
  styleUrls: ['../../Styles/basePage.scss','./AccountPage.component.scss']
})
export class AccountPageComponent implements OnInit {
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }

  inputText = "";

  get headerUrl() {
    let headerText = 'Perfil'
    switch (this.router.url) {
      case '/Account/Name':
        headerText = 'Alterar Nome';
        break;
      case '/Account/Email':
        headerText = 'Alterar Email';
        break;
      case '/Account/Phone':
        headerText = 'Alterar Telefone';
        break;
      case '/Account/Password':
        headerText = 'Alterar Senha';
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
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');
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
