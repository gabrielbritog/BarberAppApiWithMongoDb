import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ExtraBtn, IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel, ClientModelHelper } from 'src/app/Models/ClientModel';
import { ClientService } from 'src/app/Services/api/Client.service';

@Component({
  selector: 'app-EditClient',
  templateUrl: './EditClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './EditClient.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {

  id: string = '';
  subscription?: Subscription;

  clientModel: ClientModel = ClientModelHelper.create();

  formIndex = 0;
  maxFormIndex = 0;

  backBtn: ExtraBtn = {
    label: 'Voltar',
    onClick: () => this.formIndex--
  }
  formTitles = ['Dados de Cadastro', 'Dados pessoais', 'Endereço', 'Contato de emergência', 'Dados complementares']
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



  getAbsencesTable() {
    const absencesTable: DefaultTable = {
      titles: ['Turma', 'Data', 'Presença'],
      objects: [],
      onClick: (event: any) => this.goToScheduleDetails(event)
    }

    const classesWithClient = GlobalVariables.schedules
      .filter(p => p.schedulingClass && GlobalVariables.allClasses.find(cl =>
        cl.id === p.schedulingClass?.classId)?.clientsId.includes(this.clientModel.clientId ?? '')
      )
      .map(p => {
        return {
          date: p.date,
          time: p.time,
          className: GlobalVariables.allClasses.find(cl =>
            cl.id === p.schedulingClass?.classId)!.name,
          presence: p.schedulingClass?.presenceList.some(c=> c.clientId === this.clientModel.clientId && c.presence),
          scheduleId: p.schedulingId
        }
    });

    classesWithClient.forEach((classWithClient, i) => {
      absencesTable.objects.push({
        object: {
          className: classWithClient.className,
          date: classWithClient.date,
          presence: classWithClient.presence? 'Presente' : 'Faltou',
          id: classWithClient.scheduleId
        }
      })
    })

    return absencesTable;
  }

  goToScheduleDetails(event: any) {
    if (!event.object.id)
      return;

    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = GlobalVariables.schedules.find(p=>p.schedulingId === event.object.id);

    this.router.navigateByUrl(`/Schedules/Details`);
  }

  constructor(
    private clientsService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {  }

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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  assingInputsIntoModel() {
    this.modalInputs.forEach((formInput, index) => {
      const formValues = formInput.reduce((result: any) => {
        formInput.forEach(p => {
          const key = p.id;
          result[key] = p.value;
        });
        return result;
      }, {});

      if (index === 2) // Endereço
      {
        this.clientModel.adress = formValues;
      }
      else if (index === 3) // Contato de emergência
        this.clientModel.emergencyContact = formValues;
      else
        Object.assign(this.clientModel, formValues)
    })
  }

  onSubmit(form: NgForm) {

    this.assingInputsIntoModel();

    if (form.invalid)
      return;

    if (this.formIndex < this.formTitles.length - 1){
      this.formIndex++;
      this.maxFormIndex = Math.max(this.maxFormIndex, this.formIndex);
      return;
    }

    const apiCall = this.clientsService.update(this.clientModel);

    apiCall.subscribe({
      next: (data: any) => {
        setTimeout(() => {
          const existedClient = GlobalVariables.clients.find(p => p.clientId === this.id)!;
          Object.assign(existedClient, data.data);

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

  updateModalInputs() {
    this.modalInputs = [
      // 0 - Dados de cadastro
      [
        {
          id: 'registerNumber',
          label: 'N° do Cadastro',
          type: 'text',
          value: this.clientModel.registerNumber?? '',
          options: {
            max: '12',
            mask: 'number'
          }
        },
        {
          id: 'interviewNumber',
          label: 'N° da Entrevista',
          type: 'text',
          value: this.clientModel.interviewNumber?? '',
          options: {
            max: '12',
            mask: 'number'
          }
        },
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          value: this.clientModel.name
        },
      ],
      // 1 - Dados pessoais
      [
        {
          id: 'phone',
          label: 'Contato',
          type: 'text',
          value: this.clientModel.phone?? '',
          options: {
            mask: 'tel'
          }
        },
        {
          id: 'email',
          label: 'E-mail',
          type: 'email',
          value: this.clientModel.email?? '',
        },
        {
          id: 'dateOfBirth',
          label: 'Data de nascimento',
          type: 'date',
          value: moment(this.clientModel.dateOfBirth).format('YYYY-MM-DD'),
          options: {
            max: moment().format('YYYY-MM-DD')
          }
        },
        {
          id: 'rg',
          label: 'RG',
          type: 'text',
          value: this.clientModel.rg?? '',
          options: {
            mask: 'rg'
          }
        },
        {
          id: 'cpf',
          label: 'CPF',
          type: 'text',
          value: this.clientModel.cpf?? '',
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
          value: this.clientModel.adress?.cep?? '',
        },
        {
          id: 'uf',
          label: 'Estado',
          type: 'text',
          options: {
            required: false
          },
          value: this.clientModel.adress?.uf?? '',
        },
        {
          id: 'city',
          label: 'Cidade',
          type: 'text',
          options: {
            required: false
          },
          value: this.clientModel.adress?.city?? '',
        },
        {
          id: 'street',
          label: 'Rua',
          type: 'text',
          options: {
            required: false
          },
          value: this.clientModel.adress?.street?? '',
        },
        {
          id: 'zone',
          label: 'Bairro',
          type: 'text',
          options: {
            required: false
          },
          value: this.clientModel.adress?.zone?? '',
        },
        {
          id: 'number',
          label: 'Número',
          type: 'text',
          value: this.clientModel.adress?.number?? '',
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
          value: this.clientModel.emergencyContact?.name?? '',
        },
        {
          id: 'phone',
          label: 'Telefone',
          type: 'text',
          options: {
            required: false,
            mask: 'tel'
          },
          value: this.clientModel.emergencyContact?.phone?? '',
        },
        {
          id: 'phoneResidential',
          label: 'Celular',
          type: 'text',
          options: {
            required: false,
            mask: 'tel'
          },
          value: this.clientModel.emergencyContact?.phoneResidential?? '',
        },
        {
          id: 'kinship',
          label: 'Parentesco',
          type: 'text',
          options: {
            required: false
          },
          value: this.clientModel.emergencyContact?.kinship?? '',
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
          value: this.clientModel.occupation?? '',
        },
        {
          id: 'retiree',
          label: 'Aposentado',
          type: 'simple-radio',
          value: this.clientModel.retiree?? false,
          options: {
            required: false
          },
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
          value: this.clientModel.observation?? '',
        },
      ],
    ]
  }
}
