import { ServiceTypeModel } from './../../../Models/ServiceTypeModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleModel } from '../../../Models/ScheduleModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { SchedulingService } from '../../../Services/SchedulingService.service';
import { LoaderComponent } from '../../Loader/Loader.component';

@Component({
  selector: 'app-SchedulingModal',
  templateUrl: './SchedulingModal.component.html',
  styleUrls: ['./SchedulingModal.component.scss']
})
export class SchedulingModalComponent implements OnInit {

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

  get serviceTypes() {return GlobalVariables.serviceTypes};

  get currentDay(){return GlobalVariables.currentDay.format('YYYY-MM-DD')};

  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {
    console.log(this.serviceTypes);
  }

  onSubmit(form: NgForm) {
    let schedule = new ScheduleModel(form.value);
    schedule.serviceType = this.selectedServiceTypes;

    this.schedulingService.registerSchedule(schedule).subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        setTimeout(() => {
          GlobalVariables.schedules.push(schedule);
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

  addToList(element: ServiceTypeModel) {
    if (this.selectedServiceTypes.includes(element))
      this.selectedServiceTypes = this.selectedServiceTypes.filter(p => p != element);
    else
      this.selectedServiceTypes.push(element);
  }

}
