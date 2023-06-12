import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from '../../../Services/auth/Auth.service';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import * as moment from 'moment';
import { LoadAppService } from 'src/app/Services/api/LoadApp.service';
import { DashboardSectionComponent } from '../../Shared/DashboardPage/DashboardSection.component';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.scss']
})
export class LoginPageComponent implements OnInit {
  title = 'Login';

  loginForm: IFormInput[] = [
    { // Email
      id: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    },
    { // Senha
      id: 'password',
      label: 'Senha',
      type: 'password',
      value: ''
    },
    { // Funcionário
      id: 'isEmployee',
      label: 'Sou Funcionário',
      type: 'simple-checkbox',
      value: false
    },
  ]

  submited = false;
  hide = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private loadAppService: LoadAppService,
    private router: Router) { }

  ngOnInit() {
    GlobalVariables.isAppLoaded = false;
    if (this.tokenStorage.getToken())
      this.router.navigateByUrl('/Home');
  }

  onSubmit(form: NgForm) {
    this.submited = true;

    const errorString = 'Usuário ou senha incorretos.';
    const userModel = new UserModel(form.value);
    const isEmployee = form.value.isEmployee;

    if (form.invalid){
      this.toastr.error(errorString);
      return;
    }

    const API_CALL = isEmployee ? this.authService.loginBarber(userModel) : this.authService.login(userModel);

    API_CALL.subscribe({
      next: (data: any) => this.loginSuccess(data),
      error: (err) => {

      }
    })

  }

  showPassword(elementId: string) {
    var element = document.getElementById(elementId) as HTMLInputElement;
    if (element.type == 'password')
      element.type = 'text';
    else
      element.type = 'password';
  }

  isShowPassword(elementId: string) {
    var element = document.getElementById(elementId) as HTMLInputElement;
    if (element.type == 'password')
      return false;

    return true;
  }

  isControlValid(elementId: string, basePasswordElement?: string) {
    const element = document.getElementById(elementId) as HTMLInputElement;
    var elementBase = true;

    if (basePasswordElement)
      elementBase =
        element.value == (document.getElementById(basePasswordElement) as HTMLInputElement).value;

    if (!this.submited)
      return true;

    return (element.validity.valid && elementBase && element.value != "");
  }

  goToRoute(route: string) {
    this.hide = true;
    setTimeout(() => {
      this.router.navigateByUrl(route);
    }, 200);
  }

  loginSuccess(data: any) {
    this.tokenStorage.saveToken(data.data.accessToken, data.data.expiration);
    this.tokenStorage.saveUser(data.data.dados);

    if (!GlobalVariables.isAppLoaded) {
      this.loadApp();
    }

    this.router.navigateByUrl('/Home');
  }
  loadApp() {
    DashboardSectionComponent.clearProperties();
    GlobalVariables.showSidebar = false;
    GlobalVariables.init(this.loadAppService);
  }

}
