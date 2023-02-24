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

  get serviceTypes() { return GlobalVariables.serviceTypes; }

  get isTodayDate() {
    return this.currentDay == moment().format('YYYY-MM-DD');
  }

  get currentDaySchedules() {
    var result = GlobalVariables.schedules
                .filter(p => moment.utc(p.schedulingDate).format('YYYY-MM-DD') == this.currentDay)
                .sort((n1, n2) => {
                  if (n1.time > n2.time) {
                      return 1;
                  }
                  if (n1.time < n2.time) {
                      return -1;
                  }
                  return 0;
                });
    return result;
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
        console.log(data.data.message);
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
    this.showModal = false;
  }

  setAvailableSchedules() {
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    const editScheduleModel = this.scheduleModel;
    let currentDaySchedules = this.currentDaySchedules;
    let schedules: ScheduleModel[] = [];

    for (let index = 0; index < emptySchedulesTemplate.length; index++) {
      let newSchedule = new ScheduleModel({
        date: this.currentDay,
        time: emptySchedulesTemplate[index].time
      })

      let schedule = currentDaySchedules.find(p => p.time == newSchedule.time);
      let editSchedule = editScheduleModel.time == newSchedule.time;

      if (!schedule || (this.isEditModal && editSchedule))
        schedules.push(newSchedule);
    }

    if (this.isTodayDate)
      schedules = schedules.filter(p=> p.time >=  moment().format('HH:mm'))

    return schedules;
  }


}
