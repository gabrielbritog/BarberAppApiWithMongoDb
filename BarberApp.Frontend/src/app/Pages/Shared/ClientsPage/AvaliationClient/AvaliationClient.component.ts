import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';
import { BarberModel } from 'src/app/Models/BarberModel';
import { ClientModel, ClientModelHelper } from 'src/app/Models/ClientModel';
import { ClientService } from 'src/app/Services/api/Client.service';
import { RouteHistoryService } from '../../../../Services/misc/route-history.service';

const dateTimeFormat = 'YYYY-MM-DD'

@Component({
  selector: 'app-AvaliationClient',
  templateUrl: './AvaliationClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './AvaliationClient.component.css']
})
export class AvaliationClientComponent implements OnInit {

  id: string = '';
  subscription?: Subscription;

  clientModel: ClientModel = ClientModelHelper.create();

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

  get isUserLevelToEdit() {
    return GlobalVariables.userLevel <= environment.userLevel.readAndEdit;
  }

  constructor(
    private clientsService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeHistory: RouteHistoryService,
  ) { }

  ngOnInit() {

    if (!this.activatedRoute.snapshot.params['id']){
      this.router.navigateByUrl('/Clients');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['id']){
            this.router.navigateByUrl('/Clients');
            return;
          }

          this.id = params['id'];

          const existedClientModel = GlobalVariables.clients.find(client => client.clientId === this.id);

          if (!existedClientModel) {
            this.router.navigateByUrl('/Clients');
            return;
          }

          this.clientModel = ClientModelHelper.clone(existedClientModel);
          this.updateModalInputs();
        }
      )
  }

  updateModalInputs() {
    const evaluationSheet = this.clientModel.evaluationSheet;

    const EmployeesAsFormOptions = () => {
      return GlobalVariables.employees.map((employee: BarberModel, index: number) => {
        return {
          id: 'employee_' + index,
          label: `${employee.firstName} ${employee.lastName}`,
          value: employee.barberId,
          isSelected: evaluationSheet?.appraiser === employee.barberId
        }
      });
    }

    function formatDatetime(date?: string) {
      if (!date)
        return moment().format(dateTimeFormat);

      return moment(date).format(dateTimeFormat);
    }

    this.modalInputs =
    [
      {
        id: 'dateOfAssessment',
        label: 'Data da avaliação',
        type: 'date',
        value: formatDatetime(evaluationSheet?.dateOfAssessment),
      },
      {
        id: 'entryTime',
        label: 'Horário de entrada',
        type: 'text',
        value: evaluationSheet?.entryTime?? '',
        options:{
          mask: 'time'
        }
      },
      {
        id: 'departureTime',
        label: 'Horário de saída',
        type: 'text',
        value: evaluationSheet?.departureTime?? '',
        options:{
          mask: 'time'
        }
      },
      {
        id: 'appraiser',
        label: 'Avaliador',
        type: 'select',
        value: evaluationSheet?.appraiser?? '',
        formOptions: EmployeesAsFormOptions()
      },
      {
        id: 'physicalActivity',
        label: 'Atividades físicas praticadas',
        type: 'text',
        value: evaluationSheet?.physicalActivity ?? '',
        options: {
          required: false
        }
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
            value: evaluationSheet?.bodyProportions.weight?? '',
            options: {
              mask: 'size',
            }
          },
          {
            id: 'height',
            label: 'Altura',
            type: 'text',
            value: evaluationSheet?.bodyProportions.height?? '',
            options: {
              mask: 'size'
            }
          },
          {
            id: 'bloodPressure',
            label: 'Pressão Sanguínea',
            type: 'text',
            value: evaluationSheet?.bodyProportions.bloodPressure?? '',
          },
          {
            id: 'imc',
            label: 'IMC',
            type: 'text',
            value: evaluationSheet?.bodyProportions.imc?? '',
            options: {
              mask: 'size'
            }
          },
          {
            id: 'classification',
            label: 'Classificação',
            type: 'text',
            value: evaluationSheet?.bodyProportions.classification?? '',
          },
          {
            id: 'waist',
            label: 'Cintura',
            type: 'text',
            value: evaluationSheet?.bodyProportions.waist?? '',
            options: {
              mask: 'size'
            }
          },
          {
            id: 'hip',
            label: 'Quadril',
            type: 'text',
            value: evaluationSheet?.bodyProportions.hip?? '',
            options: {
              mask: 'size'
            }
          },
          {
            id: 'abdomen',
            label: 'Abdômen',
            type: 'text',
            value: evaluationSheet?.bodyProportions.abdomen?? '',
            options: {
              mask: 'size'
            }
          },
        ]
      },
      {
        id: 'details',
        label: 'Detalhes',
        type: 'textarea',
        value: evaluationSheet?.details ?? '',
        options: {
          required: false
        }
      },
      {
        id: 'certificateDelivered',
        label: 'Certificado entregue',
        type: 'date',
        value: formatDatetime(evaluationSheet?.certificateDelivered),
      },
      {
        id: 'dateOfReturn',
        label: 'Data de retorno',
        type: 'date',
        value: formatDatetime(evaluationSheet?.dateOfAssessment),
      },
    ]

    if (!this.isUserLevelToEdit) {
      this.modalInputs.forEach(p => {
        p.disabled = true
        if (p.formGroup)
          p.formGroup.forEach(b => b.disabled = true);
      })
    }
  }

  onSubmit(form: any) {
    if (!this.isUserLevelToEdit) {
      this.onCancel()
      return;
    }

    this.clientModel.evaluationSheet = form.value;

    this.clientModel.evaluationSheet!.practicePhysicalActivity = this.clientModel.evaluationSheet!.physicalActivity !== ''

    const API_CALL = this.clientsService.updateEvaluationSheet(this.clientModel);
    const existedClientModel = GlobalVariables.clients.find(client => client.clientId === this.id);

    API_CALL.subscribe({
      next: (value) => {
        if (existedClientModel)
          existedClientModel.evaluationSheet = value.data.evaluationSheet;

        this.onCancel();
      },
    })
  }

  onCancel() {
    this.routeHistory.navigateBack()
  }

}
