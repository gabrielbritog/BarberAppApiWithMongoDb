import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationEnum } from 'src/app/Enums/ValidationEnum.enum';
import { UserModel } from 'src/app/Models/UserModel';
import { FormValidationService } from 'src/app/Services/FormValidation.service';
import { AuthService } from '../../Services/Auth.service';
import { TokenStorageService } from '../../Services/token-storage.service';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.scss']
})
export class LoginPageComponent implements OnInit {

  submited = false;
  isLoggedIn = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken())
      this.isLoggedIn = true;
  }

  onSubmit(form: NgForm) {
    this.submited = true;

    const successString = 'Usuário logado com sucesso.';
    const errorString = 'Usuário ou senha incorretos.';
    const userModel = new UserModel(form.value);

    if (form.invalid){
      this.toastr.error(errorString);
      return;
    }


    this.authService.login(userModel).subscribe({
      next: (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.dados);
        this.toastr.success(successString);
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.toastr.error(err);
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

}
