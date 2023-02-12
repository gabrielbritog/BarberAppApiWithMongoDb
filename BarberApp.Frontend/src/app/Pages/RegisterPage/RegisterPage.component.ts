import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../Services/FormValidation.service';
import { AuthService } from '../../Services/Auth.service';
import { UserModel } from '../../Models/UserModel';

@Component({
  selector: 'app-RegisterPage',
  templateUrl: './RegisterPage.component.html',
  styleUrls: ['./RegisterPage.component.scss']
})
export class RegisterPageComponent implements OnInit {

  submited = false;


  constructor(
    private toastr: ToastrService,
    private formValidation: FormValidationService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submited = true;

    const toastrString = 'Usuário criado com sucesso.';
    const validationResult = this.formValidation.checkValidation(form);
    const userModel = new UserModel(form.value);

    if(form.invalid){
      for (let i = 0; i < validationResult.length; i++)
        this.toastr.error(validationResult[i]);
      return;
    }


    this.authService.register(userModel).subscribe({
      next: (data: UserModel) => {
        console.log(data);
        this.toastr.success(toastrString);
      },
      error: (err) => {
        this.toastr.error(err);
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
}
