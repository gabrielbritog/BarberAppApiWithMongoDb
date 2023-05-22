import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesSectionComponent } from './SchedulesSection.component';
import { ComponentsModule } from '../../../Components/components.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { RouterModule } from '@angular/router';
import { SchedulePresenceComponent } from './schedule-presence/schedule-presence.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SchedulesSectionComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent,
    SchedulePresenceComponent
  ],
  exports: [
    SchedulesSectionComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent,
    SchedulePresenceComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule
  ]
})
export class SchedulesPageModule { }
