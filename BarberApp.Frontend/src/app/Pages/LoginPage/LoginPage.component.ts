import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from '../../Services/Auth.service';
import { TokenStorageService } from '../../Services/token-storage.service';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { LoaderComponent } from '../../Components/Loader/Loader.component';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: IFormInput[] = [
    { // Company Name
      id: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    },
    { // First Name
      id: 'password',
      label: 'Senha',
      type: 'password',
      value: ''
    },
  ]

  submited = false;
  hide = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
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

    if (form.invalid){
      this.toastr.error(errorString);
      return;
    }


    this.authService.login(userModel).subscribe({
      next: (data: any) => this.loginSuccess(data),
      error: (err) => {
        this.authService.loginBarber(userModel).subscribe({
          next: (data: any) => this.loginSuccess(data),
          error: (err) => this.loginError(err)
        })
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
    this.tokenStorage.saveToken(data.data.accessToken);
    this.tokenStorage.saveUser(data.data.dados);

    setTimeout(() => {
      this.router.navigateByUrl('/Home');
    }, LoaderComponent.timeoutOffset);
  }

  loginError(error: any) {
    LoaderComponent.SetOptions(false, false, true);

    setTimeout(() => {
      console.log(error.error);
      if (error.error.data != null)
        this.toastr.error(error.error.data);
      else
        this.toastr.error("Algo deu errado, tente novamente.");
    }, LoaderComponent.timeoutOffset);
  }

}
