import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { SchedulingService } from '../../../Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['./SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {

  scheduleModel = new ScheduleModel();

  selectedServiceTypes: ServiceTypeModel[] = [];

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

  get currentDay() {
    return this.isEditModal ?
      moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') :
      GlobalVariables.currentDay.format('YYYY-MM-DD');
  }

  get currentTime() {
    return moment.utc(this.scheduleModel.schedulingDate).format('HH:mm');
  }

  constructor(private schedulingService: SchedulingService) {
  }

  ngOnInit() {
    this.scheduleModel = new ScheduleModel(GlobalVariables.editSchedule);
    this.selectedServiceTypes = this.isEditModal ? [...this.scheduleModel.serviceType] : [];
  }

  onSubmit(form: NgForm) {
    let schedule = new ScheduleModel(form.value);
    schedule.schedulingId = this.isEditModal ? this.scheduleModel.schedulingId : schedule.schedulingId;
    schedule.serviceType = this.selectedServiceTypes;

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
    this.showModal = false;
    form.resetForm({
      date: this.currentDay
    });
  }

  hasService(serviceType: ServiceTypeModel): boolean {
    return this.selectedServiceTypes.some(p => p.serviceTypeId === serviceType.serviceTypeId);
  }

  addToList(element: ServiceTypeModel) {
    if (this.hasService(element))
      this.selectedServiceTypes = this.selectedServiceTypes.filter(p => p.serviceTypeId != element.serviceTypeId);
    else
      this.selectedServiceTypes.push(element);
  }

}
