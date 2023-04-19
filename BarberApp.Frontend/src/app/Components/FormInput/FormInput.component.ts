import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormInput, IFormOptions } from './IFormInput';
import { NgForm, FormControl, Validators, FormGroup, FormControlOptions, ValidatorFn, AbstractControl } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-FormInput',
  templateUrl: './FormInput.component.html',
  styleUrls: ['./FormInput.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() inputs: IFormInput[] = [];
  @Input() submitText: string = "Salvar";
  @Output() submitAction = new EventEmitter<NgForm>();
  @Input() marginOnSubmit = true;

  genericFormModel!: FormGroup;
  listOfCheckboxes: any[] = [];
  submitted = false;

  constructor() {
  }

  ngOnInit() {
    this.createForm();
    this.listOfCheckboxes.forEach(element => {
      this.checkboxElement(element);
    })
  }

  createForm() {
    const formGroupConfig: any = {};
    this.inputs.forEach((input) => {
      const validatorFields = this.getValidatorFields(input);
      const control = new FormControl(input.value, validatorFields);
      if (input.type == 'checkbox')
        this.listOfCheckboxes.push(input);

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

  checkAtLeastOneSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const isChecked = control.value.length > 0;
      return isChecked ? null : { atLeastOneSelected: true };
    };
  }

  getValidatorFields(item: IFormInput): FormControlOptions {
    const formControlOptions: FormControlOptions = {};
    const validators: ValidatorFn[] = [];
    if (item.type != 'checkbox')
      validators.push(Validators.required);
    switch (item.type) {
      case 'email':
        validators.push(Validators.email);
        break;
      case 'password':
        validators.push(Validators.minLength(8));
        break;
      case 'checkbox':
        validators.push(this.checkAtLeastOneSelectedValidator());
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

    if (validatorErrors.hasError('atLeastOneSelected'))
      return `Selecione pelo menos 1.`;

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

  isArray(element: string | string[]) {
    return Array.isArray(element);
  }

  getArrayElements(element: string | string[]) {
    return element as string[];
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.listOfCheckboxes.forEach((checkboxGroup: any, index) => {
      form.value[checkboxGroup.id] = checkboxGroup.value
                                     .filter((p: IFormOptions) => p.isSelected)
                                     .map((p: IFormOptions)=> p.value);
    })
    this.genericFormModel.setValue(form.value);

    if (!this.genericFormModel.valid)
      return;

    this.submitAction.emit(form);
  }

  checkboxElement(arrayElement: IFormInput) {
    arrayElement.value = arrayElement.formOptions;
  }

  getSelectedCheckboxes(arrayElement: IFormInput) {
    const elements = (arrayElement.value as IFormOptions[]).filter((p: IFormOptions) => p.isSelected);
    return elements;
  }

  getSelectedNames(arrayElement: IFormInput) {
    const elements = this.getSelectedCheckboxes(arrayElement);
    return elements.map(p=>p.label[0]);
  }

  getTotalValue(item: IFormInput) {
    const total = item.value
      .filter((p: IFormOptions) => p.isSelected)
      .map((p: IFormOptions) => p.value.valueService)
      .reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);

    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
