import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesSectionComponent } from './SchedulesSection.component';
import { ComponentsModule } from '../../../Components/components.module';



@NgModule({
  declarations: [
    SchedulesSectionComponent,
  ],
  exports: [
    SchedulesSectionComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class SchedulesPageModule { }
