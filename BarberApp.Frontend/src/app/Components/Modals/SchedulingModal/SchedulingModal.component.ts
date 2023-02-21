import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, Input, OnInit } from '@angular/core';
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

  currentDay = this.isEditModal ?
      moment.utc(this.scheduleModel.schedulingDate).format('YYYY-MM-DD') :
      GlobalVariables.currentDay.format('YYYY-MM-DD');

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
                .filter(p => p.date == GlobalVariables.currentDay.format('L'))
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
    const emptySchedulesTemplate = GlobalVariables.emptySchedules;
    let currentDaySchedules = this.currentDaySchedules;
    let schedules: ScheduleModel[] = [];

    for (let index = 0; index < emptySchedulesTemplate.length; index++) {
      let newSchedule = new ScheduleModel({
        date: GlobalVariables.currentDay.format('YYYY-MM-DD'),
        time: emptySchedulesTemplate[index].time
      })

      let schedule = currentDaySchedules.find(p => p.time == newSchedule.time);

      if (!schedule)
        schedules.push(newSchedule);
    }

    if (this.isTodayDate)
      schedules = schedules.filter(p=> p.time >=  moment().format('HH:mm'))

    return schedules;
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
