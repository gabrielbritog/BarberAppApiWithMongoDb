import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtraBtn, IFormInput, IFormOptions } from './IFormInput';
import { NgForm, FormControl, Validators, FormGroup, FormControlOptions, ValidatorFn, AbstractControl } from '@angular/forms';
import { map } from 'rxjs';
import { CepApiService } from 'src/app/Services/cepApi/cep-api.service';
import { CepAdressModel } from 'src/app/Services/cepApi/cep-model';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';

@Component({
  selector: 'app-FormInput',
  templateUrl: './FormInput.component.html',
  styleUrls: ['./FormInput.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() inputs: IFormInput[] = [];
  @Input() extraBtnLeft?: ExtraBtn;
  @Input() extraBtnRight?: ExtraBtn;
  @Input() formTitle?: string;
  @Input() titleOnMobileOnly: boolean = false;
  @Input() submitText: string = "Salvar";
  @Output() submitAction: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Input() marginOnSubmit = true;
  @Input() hideBgStyles = false;

  genericFormModel!: FormGroup;
  listOfCheckboxes: any[] = [];
  collapseGroups: {
    id: string,
    isCollapse: boolean
  }[] = []
  submitted = false;

  constructor(
    private cepApiService: CepApiService,
    private toastrService: ToastrService
  ) {
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
      if (input.type === 'formgroup' && input.formGroup) {
        const subFormGroupConfig: any = {};
        this.collapseGroups.push({
          id: input.id,
          isCollapse: true
        });

        input.formGroup.forEach(subinput => {
          const validatorFields = this.getValidatorFields(subinput);
          const control = new FormControl(subinput.value, validatorFields);
          if (subinput.type == 'checkbox')
            this.listOfCheckboxes.push(subinput);
          subFormGroupConfig[subinput.id] = control;
        })

        formGroupConfig[input.id] = new FormGroup(subFormGroupConfig);
        return;
      }

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

  isGroupCollapse(groupId: string) {
    return this.collapseGroups.find(p => p.id === groupId)?.isCollapse?? false;
  }

  changeGroupCollapse(groupId: string) {
    const group = this.collapseGroups.find(p => p.id === groupId);

    if (group)
      group.isCollapse = !group.isCollapse
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
    if (item.type != 'checkbox' && item.options?.required !== false)
      validators.push(Validators.required);
    switch (item.type) {
      case 'email':
        validators.push(Validators.email);
        break;
      case 'password':
        validators.push(Validators.minLength(8));
        break;
      case 'checkbox':
        if (item.options?.required !== false && item.options?.min !== '0')
          validators.push(this.checkAtLeastOneSelectedValidator());
        break;
      default:
        break;
    }
    formControlOptions.validators = validators;
    return formControlOptions;
  }

  getValidationMessage(item: IFormInput, subItem?: IFormInput): string | null {
    let validatorErrors = this.genericFormModel.get(item.id);

    if (subItem) {
      validatorErrors = this.genericFormModel.get(item.id)?.get(subItem.id)?? null;
    }

    if (!validatorErrors || !validatorErrors.errors || !this.submitted) {
      return null;
    }

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

    if (GlobalVariables.userLevel < environment.userLevel.readAndEdit) {
      this.genericFormModel.setValue(form.value);

      if (!this.genericFormModel.valid)
        return;
    }

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

  onChangeOfInput(event: any, itemOption?: any) {
    if (!itemOption?.onChangeUpdateFields)
      return;

    if (itemOption.mask === 'cep')
      this.updateCepFields(event, itemOption.onChangeUpdateFields)

  }

  updateCepFields(cep: string, idFields: string[]) {
    if (cep.length < 8)
      return;

    this.cepApiService.getAdressByCep(cep).subscribe({
      next: (response: CepAdressModel) => {
        if (response.erro) {
          this.toastrService.error('Cep inválido')
          return;
        }

        idFields.forEach(p => {
          const existedInput = this.inputs.find(b => b.id === p);
          if (!existedInput)
            return;

          if (p === 'uf')
            existedInput.value = response.uf;

          if (p === 'city')
            existedInput.value = response.localidade;

          if (p === 'street')
            existedInput.value = response.logradouro;

          if (p === 'zone')
            existedInput.value = response.bairro;
        })


      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // FORM MASKS

  formMask(mask: 'cep' | 'tel' | 'cpf' | 'rg' | 'number' | 'size' | 'time', max?: string) {
    switch (mask) {
      case 'cep':
        return '00000-000';
      case 'tel':
        return '(00) 0000-0000||(00) 0 0000-0000';
      case 'cpf':
        return '000.000.000-00';
      case 'rg':
        return '00.000.000-0';
      case 'number': {
        let tempMask = '0'
        const maxAmount = parseInt(max ?? '6');
        for (let index = 1; index < maxAmount; index++) {
          tempMask += '0';
        }
        return tempMask;
      }
      case 'size': {
        let tempMask = 'separator.2'
        return tempMask;
      }
      case 'time':
        return '00:00';

      default:
        return '';
    }
  }

}
