import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { SchedulingService } from '../../../Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';
import * as moment from 'moment';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['./SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {


  get scheduleModel() {
    return new ScheduleModel(GlobalVariables.editSchedule);
  };

  selectedServiceTypes: ServiceTypeModel[] = [];


  get totalServices() {
    return this.selectedServiceTypes
      .map(p => p.valueService)
      .reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
  }

  get showModal() {
    return GlobalVariables.showScheduleModal;
  };

  set showModal(value) {
    GlobalVariables.showScheduleModal = value;
  };

  get isEditModal() { return GlobalVariables.modalAsEdit; }

  get serviceTypes() { return GlobalVariables.serviceTypes };

  get currentDay(){ return this.isEditModal? moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') : GlobalVariables.currentDay.format('YYYY-MM-DD') };

  get currentTime() {
    return this.isEditModal ? moment.utc(this.scheduleModel.schedulingDate).format('HH:mm') : '';
  }

  constructor(private schedulingService: SchedulingService) {
  }

  ngOnInit() {
    if (this.isEditModal){
      this.selectedServiceTypes = [];
      this.selectedServiceTypes = this.selectedServiceTypes.concat(this.scheduleModel.serviceType);
    }
  }

  hasService(serviceType: ServiceTypeModel) {
    return this.selectedServiceTypes
      .map(p=> p.nameService)
      .includes(serviceType.nameService);
  }

  onSubmit(form: NgForm) {
    let schedule = new ScheduleModel(form.value);
    schedule.schedulingId = this.isEditModal ? this.scheduleModel.schedulingId : schedule.schedulingId;
    schedule.serviceType = this.selectedServiceTypes;

    if( this.isEditModal == false)
      this.schedulingService.registerSchedule(schedule).subscribe({
        next: (data: any) => {
          LoaderComponent.SetOptions(false);
          setTimeout(() => {
            GlobalVariables.schedules.push(new ScheduleModel(data.data));
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
    else
      this.schedulingService.updateSchedule(schedule).subscribe({
        next: (data: any) => {
          LoaderComponent.SetOptions(false);
          setTimeout(() => {
            let index = GlobalVariables.schedules.indexOf(GlobalVariables.editSchedule!);
            GlobalVariables.schedules[index] = new ScheduleModel(data.data);
            this.showModal = false;
            form.resetForm({
              date: this.currentDay
            });
          }, 20);
        },
        error: (err) => {
          console.log(err);
          console.log(schedule);
          LoaderComponent.SetOptions(false);
        }
      })
  }

  onCancel(form: NgForm) {
    this.showModal = false;
    form.resetForm({
      date: this.currentDay
    });
  }

  addToList(element: ServiceTypeModel) {
    if (this.hasService(element))
      this.selectedServiceTypes = this.selectedServiceTypes.filter(p => p.nameService != element.nameService);
    else
      this.selectedServiceTypes.push(element);
  }

}
