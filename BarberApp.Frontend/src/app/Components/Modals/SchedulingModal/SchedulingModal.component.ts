import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { SchedulingService } from '../../../Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';
import * as moment from 'moment';
import { TokenStorageService } from '../../../Services/token-storage.service';
import { ClientModel } from 'src/app/Models/ClientModel';
import { IFormInput, IFormOptions } from '../../FormInput/IFormInput';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['../baseModal.scss', './SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {

  scheduleModel = new ScheduleModel();
  hideModal = false;

  inputModels: IFormInput[] = [];

  selectedServiceTypes: ServiceTypeModel[] = [];

  currentDay = "";

  currentTime = moment.utc(this.scheduleModel.schedulingDate).format('HH:mm');

  get AvailableSchedulesAsFormOptions() {
    return this.availableSchedules.map(this.mapScheduleTimeToFormOption);
  }

  mapScheduleTimeToFormOption(schedule: ScheduleModel, index: number): IFormOptions{
    return {
      id: 'schedule_' + index,
      label: schedule.time,
      value: schedule.time
    }
  }

  get ServicesAsFormOptions() {
    return this.serviceTypes.map(this.mapServicesToFormOptions);
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
        options: {min: moment().format('YYYY-MM-DD')}
      },
      {
        id: 'clientName',
        label: 'Nome do cliente',
        value: this.scheduleModel.client.name,
        type: 'text'
      },
      {
        id: 'clientPhone',
        label: 'Celular do cliente',
        value: this.scheduleModel.client.phone,
        type: 'tel'
      },
      {
        id: 'time',
        label: 'Horário',
        value: this.scheduleModel.time,
        type: 'radio',
        formOptions: this.AvailableSchedulesAsFormOptions
      },
      {
        id: 'services',
        label: 'Serviços',
        value: this.scheduleModel.serviceType,
        type: 'checkbox',
        formOptions: this.ServicesAsFormOptions
      },
    ]
  }

  get totalServices() {
    return this.selectedServiceTypes
      .map(p => p.valueService)
      .reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }

  get showModal() {
    return GlobalVariables.showScheduleModal;
  }

  set showModal(value) {
    GlobalVariables.showScheduleModal = value;
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
    private toaster: ToastrService) {
  }

  ngOnInit() {
    this.scheduleModel = new ScheduleModel(GlobalVariables.editSchedule);
    this.scheduleModel.client = new ClientModel(GlobalVariables.editSchedule?.client);
    this.currentDay = this.isEditModal ?
      moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') :
      GlobalVariables.currentDay.format('YYYY-MM-DD');
    this.selectedServiceTypes = this.isEditModal ? [...this.scheduleModel.serviceType] : [];
    this.currentTime = this.scheduleModel.time;
    this.fillInputModels();
  }

  onSubmit(form: NgForm) {

    const scheduleForm = form.value;

    const schedule = new ScheduleModel({
      barberId: GlobalVariables.isAdmin? GlobalVariables.selectedBarber?.barberId : this.tokenStorageService.getUserModel().barberId,
      schedulingId: this.isEditModal ? GlobalVariables.editSchedule?.schedulingId : scheduleForm.schedulingId,
      client: new ClientModel({ name: scheduleForm.clientName, phone: scheduleForm.clientPhone }),
      date: scheduleForm.date,
      time: scheduleForm.time,
      serviceType: scheduleForm.services
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

    const apiCall = this.isEditModal ? this.schedulingService.updateSchedule(schedule) : this.schedulingService.registerSchedule(schedule);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        console.log(data);
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.schedules.push(new ScheduleModel(data.data));
          else
            GlobalVariables.schedules[index] = new ScheduleModel(data.data);
          this.onCancel();
        }, 20);
      },
      error: (err) => {
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          console.log(err);
        }, 20);
      }
    })

  }

  onCancel() {
    const animationDelay = 150;
    this.hideModal = true;
    setTimeout(() => this.showModal = false , animationDelay);
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
