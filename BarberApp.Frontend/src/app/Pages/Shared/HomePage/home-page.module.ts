import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './HomePage.component';
import { DashboardSectionComponent } from './Sections/DashboardSection/DashboardSection.component';
import { HistorySectionComponent } from './Sections/HistorySection/HistorySection.component';
import { SchedulesSectionComponent } from './Sections/SchedulesSection/SchedulesSection.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../Components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [
    HomePageComponent,
    DashboardSectionComponent,
    HistorySectionComponent,
    SchedulesSectionComponent,
  ],
  exports: [
    HomePageComponent,
    DashboardSectionComponent,
    HistorySectionComponent,
    SchedulesSectionComponent,
  ],
})
export class HomePageModule { }
