import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationEnum } from '../Enums/ValidationEnum.enum';

@Injectable()
export class FormValidationService {

  constructor() { }

  checkValidation(form: NgForm) {

    const invalidControls = [];
    const response: string[] = [];
    let validationEnum = ValidationEnum.Ok;
    const controls = form.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        switch (name) {
          case 'firstname':
            validationEnum |= ValidationEnum.EmptyFirstName;
            break;
          case 'lastname':
            validationEnum |= ValidationEnum.EmptyLastName;
            break;
          case 'email':
            validationEnum |= ValidationEnum.InvalidEmail;
            break;
          case 'password':
            validationEnum |= ValidationEnum.InvalidPassword;
            break;
          case 'confirmpassword':
            validationEnum |= ValidationEnum.InvalidConfirmPassword;
            break;
          default:
            break;
        }
        invalidControls.push(name);
      }
    }

    if ((validationEnum & ValidationEnum.EmptyFirstName) === ValidationEnum.EmptyFirstName) {
      response.push(`O campo 'Nome' deve ser preenchido.`);
    }

    if ((validationEnum & ValidationEnum.EmptyLastName) === ValidationEnum.EmptyLastName) {
      response.push(`O campo 'Sobrenome' deve ser preenchido.`);
    }

    if ((validationEnum & ValidationEnum.InvalidEmail) === ValidationEnum.InvalidEmail) {
      response.push(`O campo 'E-mail' está inválido.`);
    }

    if ((validationEnum & ValidationEnum.InvalidPassword) === ValidationEnum.InvalidPassword) {
      response.push(`A senha precisa ter no mínimo 8 caracteres.`);
    }

    if ((validationEnum & ValidationEnum.InvalidConfirmPassword) === ValidationEnum.InvalidConfirmPassword
        || form.value.confirmpassword != form.value.password) {
      response.push(`O campo 'Confirmar senha' deve ser igual a senha.`);
    }

    return response;
  }

}
