import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesSectionComponent } from './SchedulesSection.component';
import { ComponentsModule } from '../../../Components/components.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SchedulesSectionComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent
  ],
  exports: [
    SchedulesSectionComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class SchedulesPageModule { }
