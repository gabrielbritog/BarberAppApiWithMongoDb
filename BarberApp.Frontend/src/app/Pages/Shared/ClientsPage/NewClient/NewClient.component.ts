import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtraBtn, IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientService } from '../../../../Services/api/Client.service';
import { ClientModel, ClientModelHelper } from '../../../../Models/ClientModel';
import * as moment from 'moment';

@Component({
  selector: 'app-NewClient',
  templateUrl: './NewClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './NewClient.component.css']
})
export class NewClientComponent implements OnInit {

  formIndex = 0;
  maxFormIndex = 0;

  backBtn: ExtraBtn = {
    label: 'Voltar',
    onClick: () => this.formIndex--
  }
  formTitles = ['Dados de Cadastro', 'Dados Pessoais', 'Endereço', 'Contato de emergência', 'Dados complementares']
  modalInputs: IFormInput[][] =
    [
      // 0 - Dados de cadastro
      [
        {
          id: 'registerNumber',
          label: 'N° do Cadastro',
          type: 'text',
          value: '',
          options: {
            max: '12',
            mask: 'number'
          }
        },
        {
          id: 'interviewNumber',
          label: 'N° da Entrevista',
          type: 'text',
          value: '',
          options: {
            max: '12',
            mask: 'number'
          },
        },
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          value: ''
        },
      ],
      // 1 - Dados pessoais
      [
        {
          id: 'phone',
          label: 'Contato',
          type: 'text',
          value: '',
          options: {
            mask: 'tel'
          }
        },
        {
          id: 'email',
          label: 'E-mail',
          type: 'email',
          value: '',
        },
        {
          id: 'dateOfBirth',
          label: 'Data de nascimento',
          type: 'date',
          value: '',
          options: {
            max: moment().format('YYYY-MM-DD')
          }
        },
        {
          id: 'rg',
          label: 'RG',
          type: 'text',
          value: '',
          options: {
            mask: 'rg'
          }
        },
        {
          id: 'cpf',
          label: 'CPF',
          type: 'text',
          value: '',
          options: {
            mask: 'cpf'
          }
        },
      ],
      // 2 - Endereço
      [
        {
          id: 'cep',
          label: 'CEP',
          type: 'text',
          options: {
            required: false,
            mask: 'cep',
            onChangeUpdateFields: ['uf', 'city', 'street', 'zone']
          },
          value: ''
        },
        {
          id: 'uf',
          label: 'Estado',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'city',
          label: 'Cidade',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'street',
          label: 'Rua',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'zone',
          label: 'Bairro',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'number',
          label: 'Número',
          type: 'text',
          value: '',
          options: {
            required: false
          },
        },
      ],
      // 3 - Contato de emergência
      [
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'phone',
          label: 'Telefone',
          type: 'text',
          options: {
            required: false,
            mask: 'tel'
          },
          value: ''
        },
        {
          id: 'phoneResidential',
          label: 'Celular',
          type: 'text',
          options: {
            required: false,
            mask: 'tel'
          },
          value: ''
        },
        {
          id: 'kinship',
          label: 'Parentesco',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
      ],
      // 4 - Dados complementares
      [
        {
          id: 'occupation',
          label: 'Profissão',
          type: 'text',
          options: {
            required: false
          },
          value: ''
        },
        {
          id: 'retiree',
          label: 'Aposentado',
          type: 'simple-radio',
          options: {
            required: false
          },
          value: false,
          formOptions: [
            {
              id: 'retiree',
              label: 'Sim',
              value: true
            },
            {
              id: 'retiree',
              label: 'Não',
              value: false
            },
          ]
        },
        {
          id: 'observation',
          label: 'Observações',
          type: 'textarea',
          options: {
            required: false
          },
          value: '',
        },
      ],
    ]
  clientModel: ClientModel = ClientModelHelper.create();

  constructor(
    private clientsService: ClientService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (this.formIndex === 2) // Endereço
      this.clientModel.adress = form.value;
    else if (this.formIndex === 3) // Contato de emergência
      this.clientModel.emergencyContact = form.value;
    else
      Object.assign(this.clientModel, form.value)

    if (form.invalid)
      return;

    if (this.formIndex < this.formTitles.length - 1){
      this.formIndex++;
      this.maxFormIndex = Math.max(this.maxFormIndex, this.formIndex);
      return;
    }

    const apiCall = this.clientsService.register(this.clientModel);

    apiCall.subscribe({
      next: (data: any) => {
        console.log(data.message)
        setTimeout(() => {
          GlobalVariables.clients.push(data.data);

          this.onCancel();
          form.resetForm();
        }, 20);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCancel() {
    this.router.navigateByUrl('/Clients');
  }

}
