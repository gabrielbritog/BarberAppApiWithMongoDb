import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { SchedulingService } from '../../../Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../Services/token-storage.service';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['../baseModal.scss', './SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {

  scheduleModel = new ScheduleModel();

  selectedServiceTypes: ServiceTypeModel[] = [];

  globalCurrentDay = moment().format('YYYY-MM-DD');

  currentDay = "";

  currentTime = moment.utc(this.scheduleModel.schedulingDate).format('HH:mm');

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

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  get serviceTypes() {
    const serviceTypes = GlobalVariables.serviceTypes;
    if (GlobalVariables.isAdmin)
      return serviceTypes.filter(p => p.barberId == GlobalVariables.selectedBarber?.barberId);

    return serviceTypes;
  }

  get isTodayDate() {
    return this.currentDay == moment().format('YYYY-MM-DD');
  }

  get currentDaySchedules() {
    const currentDay = GlobalVariables.currentDay.format('L');
    const filteredSchedules = GlobalVariables.schedules
      .filter(p => p.date === currentDay)
      .sort((n1, n2) => n1.time.localeCompare(n2.time));
    return !GlobalVariables.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId);
  };

  get availableSchedules() {
    return this.setAvailableSchedules();
  };

  constructor(
    private schedulingService: SchedulingService,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.scheduleModel = new ScheduleModel(GlobalVariables.editSchedule);
    this.currentDay = this.isEditModal ?
      moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') :
      GlobalVariables.currentDay.format('YYYY-MM-DD');
    this.selectedServiceTypes = this.isEditModal ? [...this.scheduleModel.serviceType] : [];
    this.currentTime = this.scheduleModel.time;
  }

  setCurrentTime(element: ScheduleModel) {
    this.scheduleModel.time = element.time;
  }

  onSubmit(form: NgForm) {
    const scheduleForm = form.value;
    scheduleForm.time = this.currentTime;
    scheduleForm.barberId = GlobalVariables.isAdmin? GlobalVariables.selectedBarber?.barberId : this.tokenStorageService.getUserModel().barberId;
    scheduleForm.schedulingId = this.isEditModal ? this.scheduleModel.schedulingId : scheduleForm.schedulingId;
    scheduleForm.serviceType = this.selectedServiceTypes;

    let schedule = new ScheduleModel(scheduleForm);
    schedule.client.name = this.scheduleModel.client.name;
    schedule.client.phone = this.scheduleModel.client.phone;

    let index = this.isEditModal? GlobalVariables.schedules.indexOf(GlobalVariables.editSchedule!) : -1;

    const apiCall = this.isEditModal ? this.schedulingService.updateSchedule(schedule) : this.schedulingService.registerSchedule(schedule);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        console.log(data.data);
        setTimeout(() => {
          if (index < 0)
            GlobalVariables.schedules.push(new ScheduleModel(data.data));
          else
            GlobalVariables.schedules[index] = new ScheduleModel(data.data);
          this.showModal = false;
          form.resetForm({
            date: this.currentDay
          });
        }, 20);
      },
      error: (err) => {
        console.log(err.message);
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          console.log(err.message);
        }, 20);
      }
    })

  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.scheduleModel = new ScheduleModel(GlobalVariables.editSchedule);
    this.showModal = false;
  }

  setAvailableSchedules() {
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

      let editSchedule = this.scheduleModel.time == newSchedule.time;
      const existingSchedule = currentDaySchedules.find(schedule => schedule.time === newSchedule.time);

      if (existingSchedule) {
        if (this.isEditModal && editSchedule)
          newSchedule = existingSchedule;
        else
          continue;
      }

      filteredSchedules.push(newSchedule);
    }

    return filteredSchedules;
  }


}
