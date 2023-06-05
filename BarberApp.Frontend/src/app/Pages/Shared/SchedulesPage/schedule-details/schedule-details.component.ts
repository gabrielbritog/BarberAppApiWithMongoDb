import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ExtraBtn, IFormInput, IFormOptions } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel, ClientModelHelper } from 'src/app/Models/ClientModel';
import { Recurrence } from 'src/app/Models/Recurrence';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { SchedulingService } from 'src/app/Services/api/SchedulingService.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { Router } from '@angular/router';
import { ClassesModel } from 'src/app/Models/ClassesModel';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {


  scheduleModel = new ScheduleModel();
  hideModal = false;

  inputModels: IFormInput[] = [];

  selectedServiceTypes: ServiceTypeModel[] = [];

  currentDay = "";

  currentTime = moment.utc(this.scheduleModel.schedulingDate).format('HH:mm');

  presenceListButton: ExtraBtn = {
    label: 'Presença',
    onClick: () => {
      this.router.navigateByUrl('/Schedules/Presence/'+this.scheduleModel.schedulingId)
    }
  }

  get AvailableSchedulesAsFormOptions() {
    return this.availableSchedules.map(this.mapScheduleTimeToFormOption);
  }

  get ServicesAsFormOptions() {
    return this.serviceTypes.map(this.mapServicesToFormOptions);
  }

  get ClassesModelAsFormOptions() {
    return GlobalVariables.allClasses.map(this.mapClassesModelToFormOptions);
  }

  get ClassesModelClientsAsFormOptions() {
    const iFormOptions: IFormOptions[] = [];
    const clients = GlobalVariables.allClasses.find(p => p.id === this.scheduleModel.schedulingClass?.classId)?.clientsId!;
    clients.forEach((client, index) => {
      iFormOptions.push(this.mapClassesModelClientsToFormOptions(client, index))
    });
    return iFormOptions;
  }

  mapScheduleTimeToFormOption(schedule: ScheduleModel, index: number): IFormOptions{
    return {
      id: 'schedule_' + index,
      label: schedule.time,
      value: schedule.time
    }
  }

  mapClassesModelToFormOptions(classModel: ClassesModel, index: number): IFormOptions{
    return {
      id: 'class_' + index,
      label: classModel.name,
      value: classModel.id,
      isSelected: GlobalVariables.editSchedule?.schedulingClass?.classId === classModel.id
    }
  }

  mapClassesModelClientsToFormOptions(_clientId: string, index: number): IFormOptions{
    const clientModel = GlobalVariables.clients.find(client => client.clientId === _clientId)!

    return {
      id: 'classClients_' + index,
      label: [clientModel.name, ''],
      value: clientModel.clientId,
      isSelected: GlobalVariables.editSchedule?.schedulingClass?.presenceList.some(p=> p.clientId === clientModel.clientId!)
    }
  }

  mapServicesToFormOptions(serviceType: ServiceTypeModel, index: number): IFormOptions{
    return {
      id: 'serviceType_' + index,
      label: [serviceType.nameService, serviceType.valueService.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
      value: serviceType,
      isSelected: GlobalVariables.editSchedule?.serviceType.some(p=>p.serviceTypeId == serviceType.serviceTypeId)
    }
  }

  fillInputModels() {
    this.inputModels = [
      {
        id: 'date',
        label: 'Data',
        value: this.currentDay,
        type: 'date',
        options: {min: moment().toISOString()}
      },
      {
        id: 'time',
        label: 'Horário',
        value: this.scheduleModel.time,
        type: 'select',
        formOptions: this.AvailableSchedulesAsFormOptions
      },
      {
        id: 'classModel',
        label: 'Turma',
        value: this.scheduleModel.schedulingClass?.classId?? '',
        type: 'select',
        formOptions: this.ClassesModelAsFormOptions
      },
      // {
      //   id: 'clientName',
      //   label: 'Nome do cliente',
      //   value: this.scheduleModel.client.name,
      //   type: 'text'
      // },
      // {
      //   id: 'clientPhone',
      //   label: 'Celular do cliente',
      //   value: this.scheduleModel.client.phone,
      //   type: 'tel'
      // },
      // {
      //   id: 'services',
      //   label: 'Serviços',
      //   value: this.scheduleModel.serviceType,
      //   type: 'checkbox',
      //   formOptions: this.ServicesAsFormOptions,
      //   options: {
      //     min: '1',
      //     showTotal: true
      //   }
      // },
      {
        id: 'recurrence',
        label: 'Repetir Agendamento',
        value: this.scheduleModel.recurrence.recurrencePeriods?? 0,
        type: 'select',
        formOptions: [
          {
            id: '0',
            label: 'Não repetir',
            value: 0
          },
          {
            id: '1',
            label: 'Semanalmente',
            value: 7
          },
          {
            id: '2',
            label: 'A cada duas semanas',
            value: 14
          },
          {
            id: '3',
            label: 'Mensalmente',
            value: 30
          },
        ]
      },
    ]
  }

  get totalServices() {
    return this.selectedServiceTypes
      .map(p => p.valueService)
      .reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }

  get isEditModal() {
    return GlobalVariables.modalAsEdit;
  }

  get serviceTypes() {
    const serviceTypes = GlobalVariables.serviceTypes;
    if (GlobalVariables.isAdmin)
      return serviceTypes.filter(p => p.barberId == GlobalVariables.selectedBarber?.barberId);

    return serviceTypes;
  }

  get currentDaySchedules() {
    const currentDay = GlobalVariables.currentDay.format('L');
    const filteredSchedules = GlobalVariables.schedules
      .filter(p => p.date === currentDay)
      .sort((n1, n2) => n1.time.localeCompare(n2.time));
    return !GlobalVariables.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId);
  };

  constructor(
    private schedulingService: SchedulingService,
    private tokenStorageService: TokenStorageService,
    private toaster: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (!GlobalVariables.selectedBarber) {
      this.onCancel();
      return;
    }
    this.scheduleModel = new ScheduleModel(GlobalVariables.editSchedule);

    this.scheduleModel.client = ClientModelHelper.clone(GlobalVariables.editSchedule?.client);
    this.currentDay = this.isEditModal ?
      moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') :
      GlobalVariables.currentDay.format('YYYY-MM-DD');
    this.selectedServiceTypes = this.isEditModal ? [...this.scheduleModel.serviceType] : [];
    this.currentTime = this.scheduleModel.time;
    this.fillInputModels();
  }

  onSubmit(form: NgForm) {

    const scheduleForm = form.value;

    const _classModel = GlobalVariables.allClasses.find(p => p.id === scheduleForm.classModel);

    const recurrenceForm : Recurrence = {
      recurrencePeriods: parseInt(scheduleForm.recurrence),
      isRecurrence: scheduleForm.recurrence > 0,
    }

    const schedule = new ScheduleModel({
      barberId: GlobalVariables.isAdmin? GlobalVariables.selectedBarber?.barberId : this.tokenStorageService.getUserModel().barberId,
      schedulingId: this.isEditModal ? GlobalVariables.editSchedule?.schedulingId : scheduleForm.schedulingId,
      client: scheduleForm.clientName? {
        name: scheduleForm.clientName,
        phone: scheduleForm.clientPhone,
      } : undefined,
      schedulingClass: _classModel? {
        classId: _classModel?.id?? '',
        presenceList: _classModel!.clientsId.map(p => {
          return {
            clientId: p,
            presence: false
          }
        })
      } : undefined,
      date: scheduleForm.date,
      time: scheduleForm.time,
      serviceType: scheduleForm.services ?? _classModel?.servicesId?.map(p =>
        GlobalVariables.serviceTypes.find(serv => serv.serviceTypeId === p)
      ),
      recurrence: recurrenceForm,
    });


    const timeIsUnavailable = GlobalVariables.schedules.find(p => (
      p.date == schedule.date &&
      ((schedule.time >= p.time  && schedule.time < p.endTime) ||
      (schedule.endTime > p.time  && schedule.endTime < p.endTime)) &&
      p.barberId == schedule.barberId &&
      p.schedulingId != schedule.schedulingId));

    if (timeIsUnavailable) {
      this.toaster.error('Você já possui um agendamento marcado nessa data e hora.', 'Horário indisponível')
      return;
    }

    let index = this.isEditModal? GlobalVariables.schedules.indexOf(GlobalVariables.editSchedule!) : -1;

    const apiCall = this.isEditModal ? this.schedulingService.update(schedule) : this.schedulingService.register(schedule);

    apiCall.subscribe({
      next: (data: any) => {
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.schedules.push(new ScheduleModel(data.data));
          else
            GlobalVariables.schedules[index] = new ScheduleModel(data.data);

          this.onCancel();
        }, 20);
      },
      error: (err) => {
        console.log(err.error);
      }
    })

  }

  onCancel() {
    this.router.navigateByUrl('/Schedules')
  }

  get availableSchedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    const currentDaySchedules = this.currentDaySchedules;
    const currentTime = moment().format('HH:mm');
    const filledTimes: any = {};
    const filteredSchedules = [];

    for (const schedule of currentDaySchedules) {
      filledTimes[schedule.time] = true;
    }

    for (const emptySchedule of emptySchedulesTemplate) {
      let newSchedule = emptySchedule;

      let editSchedule = newSchedule.time >= this.scheduleModel.time && newSchedule.time < this.scheduleModel.endTime;
      const existingSchedule = currentDaySchedules
        .find(schedule => newSchedule.time === schedule.time ||
          (newSchedule.time >= schedule.time &&
            newSchedule.time < schedule.endTime)
        );

      if (existingSchedule) {
        if ((this.isEditModal && editSchedule) === false)
          continue;
      }

      filteredSchedules.push(newSchedule);
    }

    return filteredSchedules;
  }

}
