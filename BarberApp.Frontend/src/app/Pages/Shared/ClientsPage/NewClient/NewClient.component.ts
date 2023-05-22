import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { ClientService } from '../../../../Services/api/Client.service';
import { ClientModel, ClientModelHelper } from '../../../../Models/ClientModel';

@Component({
  selector: 'app-NewClient',
  templateUrl: './NewClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './NewClient.component.css']
})
export class NewClientComponent implements OnInit {

  formIndex = 0;

  formTitles = ['Dados de Cadastro', 'Dados Pessoais', 'Endereço', 'Contato de emergência', 'Dados complementares']
  modalInputs: IFormInput[][] =
    [
      // 0 - Dados de cadastro
      [
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          value: ''
        },
        {
          id: 'registerNumber',
          label: 'N° do Cadastro',
          type: 'text',
          value: ''
        },
        {
          id: 'interviewNumber',
          label: 'N° da Entrevista',
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
        },
        {
          id: 'rg',
          label: 'RG',
          type: 'text',
          value: '',
        },
        {
          id: 'cpf',
          label: 'CPF',
          type: 'text',
          value: '',
        },
      ],
      // 2 - Endereço
      [
        {
          id: 'cep',
          label: 'CEP',
          type: 'text',
          value: ''
        },
        {
          id: 'uf',
          label: 'Estado',
          type: 'text',
          value: ''
        },
        {
          id: 'city',
          label: 'Cidade',
          type: 'text',
          value: ''
        },
        {
          id: 'street',
          label: 'Rua',
          type: 'text',
          value: ''
        },
        {
          id: 'zone',
          label: 'Bairro',
          type: 'text',
          value: ''
        },
        {
          id: 'number',
          label: 'Número',
          type: 'text',
          value: ''
        },
      ],
      // 3 - Contato de emergência
      [
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          value: ''
        },
        {
          id: 'phone',
          label: 'Telefone',
          type: 'text',
          value: ''
        },
        {
          id: 'phoneResidential',
          label: 'Celular',
          type: 'text',
          value: ''
        },
        {
          id: 'kinship',
          label: 'Parentesco',
          type: 'text',
          value: ''
        },
      ],
      // 4 - Dados complementares
      [
        {
          id: 'occupation',
          label: 'Profissão',
          type: 'text',
          value: ''
        },
        {
          id: 'retiree',
          label: 'Aposentado',
          type: 'simple-radio',
          value: 'false',
          formOptions: [
            {
              id: 'true',
              label: 'Sim',
              value: 'true'
            },
            {
              id: 'false',
              label: 'Não',
              value: 'false'
            },
          ]
        },
        {
          id: 'observation',
          label: 'Observações',
          type: 'textarea',
          value: '',
        },
      ],
    ]

  constructor(
    private clientsService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.invalid)
      return;

    let clientModel: ClientModel = ClientModelHelper.clone(form.value);

    console.log(form.value, clientModel);

    const apiCall = this.clientsService.register(clientModel);

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
