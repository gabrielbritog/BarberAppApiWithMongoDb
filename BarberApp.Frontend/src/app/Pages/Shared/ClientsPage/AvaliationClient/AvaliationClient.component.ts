import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';

const dateTimeFormat = 'YYYY-MM-DD'

@Component({
  selector: 'app-AvaliationClient',
  templateUrl: './AvaliationClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './AvaliationClient.component.css']
})
export class AvaliationClientComponent implements OnInit {

  constructor() { }

  modalInputs: IFormInput[] =
    [
      {
        id: 'entryTime',
        label: 'Horário de entrada',
        type: 'date',
        value: moment().format(dateTimeFormat),
      },
      {
        id: 'departureTime',
        label: 'Horário de saída',
        type: 'date',
        value: moment().format(dateTimeFormat),
      },
      {
        id: 'dateOfAssessment',
        label: 'Data da avaliação',
        type: 'date',
        value: '',
      },
      {
        id: 'appraiser',
        label: 'Avaliador',
        type: 'select',
        value: '',
        formOptions: []
      },
      {
        id: 'physicalActivity',
        label: 'Atividades físicas praticadas',
        type: 'text',
        value: '',
      },
      {
        id: 'bodyProportions',
        label: 'Proporções Corporais',
        type: 'formgroup',
        value: '',
        formGroup: [
          {
            id: 'weight',
            label: 'Peso',
            type: 'text',
            value: '0',
            options: {
              mask: 'number',
            }
          },
          {
            id: 'height',
            label: 'Altura',
            type: 'text',
            value: '0',
            options: {
              mask: 'number'
            }
          },
          {
            id: 'bloodPressure',
            label: 'Pressão Sanguínea',
            type: 'text',
            value: '',
          },
          {
            id: 'imc',
            label: 'IMC',
            type: 'text',
            value: '0',
            options: {
              mask: 'number'
            }
          },
          {
            id: 'classification',
            label: 'Classificação',
            type: 'text',
            value: '',
          },
          {
            id: 'waist',
            label: 'Cintura',
            type: 'text',
            value: '0',
            options: {
              mask: 'number'
            }
          },
          {
            id: 'hip',
            label: 'Quadril',
            type: 'text',
            value: '0',
            options: {
              mask: 'number'
            }
          },
          {
            id: 'abdomen',
            label: 'Abdômen',
            type: 'text',
            value: '0',
            options: {
              mask: 'number'
            }
          },
        ]
      },
      {
        id: 'details',
        label: 'Detalhes',
        type: 'textarea',
        value: '',
      },
      {
        id: 'certificateDelivered',
        label: 'Certificado entregue',
        type: 'text',
        value: '',
      },
      {
        id: 'dateOfReturn',
        label: 'Data de retorno',
        type: 'date',
        value: '',
      },
    ]

  ngOnInit() {
    this.modalInputs.forEach(p => {
      if (p.options)
        p.options.required = false;
      else
        p.options = {
        required: false
      };
    })
  }

  onSubmit(form: any) {
    console.log(form.value)
  }

}
