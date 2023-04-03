import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth/Auth.service';
import { UserModel } from '../../../Models/UserModel';
import { Router } from '@angular/router';
import { IFormInput } from '../../../Components/FormInput/IFormInput';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-RegisterPage',
  templateUrl: './RegisterPage.component.html',
  styleUrls: ['./RegisterPage.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: IFormInput[] = [
    { // Company Name
      id: 'companyName',
      label: 'Nome da Empresa',
      type: 'text',
      value: ''
    },
    { // First Name
      id: 'firstName',
      label: 'Nome',
      type: 'text',
      value: ''
    },
    { // First Name
      id: 'lastName',
      label: 'Sobrenome',
      type: 'text',
      value: ''
    },
    { // Email
      id: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    },
    { // Password
      id: 'password',
      label: 'Senha',
      type: 'password',
      value: ''
    },
    { // Confirm Password
      id: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      value: ''
    }
  ]


  submited = false;
  hide = false;

  constructor(
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken())
      this.router.navigateByUrl('/Home');
  }

  onSubmit(form: NgForm) {
    this.submited = true;

    const userModel = new UserModel(form.value);

    this.authService.register(userModel).subscribe({
      next: (data: any) => {
        this.goToRoute('/Login');
      }
    });

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
    var element = document.getElementById(elementId) as HTMLInputElement;
    var elementBase = true

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
}
