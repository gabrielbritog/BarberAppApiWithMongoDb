import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormInput } from './IFormInput';
import { NgForm, FormControl, Validators, FormGroup, FormsModule , FormControlOptions, ValidatorFn, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-FormInput',
  templateUrl: './FormInput.component.html',
  styleUrls: ['./FormInput.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() inputs: IFormInput[] = [];
  @Input() submitText: string = "Salvar";
  @Output() submitAction = new EventEmitter<NgForm>();

  genericFormModel!: FormGroup;
  submitted = false;

  constructor() {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const formGroupConfig: any = {};
    this.inputs.forEach((input) => {
      const validatorFields = this.getValidatorFields(input);
      const control = new FormControl(input.value, validatorFields);
      formGroupConfig[input.id] = control;
    });

    if(formGroupConfig['confirmPassword']){
      formGroupConfig['confirmPassword'].setValidators([
        Validators.required,
        this.matchPasswordValidator(formGroupConfig['password']),
      ]);
    }

    this.genericFormModel = new FormGroup(formGroupConfig);
  }

  matchPasswordValidator(matchControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const match = matchControl?.value === control.value;
      return match ? null : { mismatchedPasswords: true };
    };
  }

  getValidatorFields(item: IFormInput): FormControlOptions {
    const formControlOptions: FormControlOptions = {};
    const validators: ValidatorFn[] = [];
    validators.push(Validators.required);
    switch (item.type) {
      case 'email':
        validators.push(Validators.email);
        break;
      case 'password':
        validators.push(Validators.minLength(8));
        break;
      default:
        break;
    }
    formControlOptions.validators = validators;
    return formControlOptions;
  }

  getValidationMessage(item: IFormInput): string | null {
    const validatorErrors = this.genericFormModel.get(item.id);
    if (!validatorErrors || !validatorErrors.errors || !this.submitted)
      return null;

    if (validatorErrors.hasError('required'))
      return `O campo deve ser preenchido.`;

    if (validatorErrors.hasError('minlength'))
      return `O campo deve conter pelo menos ${validatorErrors.errors['minlength'].requiredLength} caracteres.`;

      if (validatorErrors.hasError('email'))
        return `O campo precisa conter um email válido.`;

    if (validatorErrors.hasError('mismatchedPasswords'))
      return `As senhas não correspondem.`;

    return null;
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

  isDirty(item: string) {

  }

  formatToMoney(value: number | string) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


  onSubmit(form: NgForm) {
    this.submitted = true;
    this.genericFormModel.setValue(form.value);
    if (!this.genericFormModel.valid)
      return;
    this.submitAction.emit(form);
  }

}
