import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingModalComponent } from './SchedulingModal/SchedulingModal.component';
import { FormInputModule } from '../FormInput/form-input.module';



@NgModule({
  declarations: [
    SchedulingModalComponent
  ],
  exports: [
    SchedulingModalComponent
  ],
  imports: [
    CommonModule,
    FormInputModule
  ]
})
export class ModalsModule { }
