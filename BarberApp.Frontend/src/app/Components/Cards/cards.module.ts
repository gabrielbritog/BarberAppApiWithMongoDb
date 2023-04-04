import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './AccountCard/AccountCard.component';
import { BarberCardComponent } from './BarberCard/BarberCard.component';
import { CalendarCardComponent } from './CalendarCard/CalendarCard.component';
import { ClientCardComponent } from './ClientCard/ClientCard.component';
import { HistoryCardComponent } from './HistoryCard/HistoryCard.component';
import { ScheduleCardComponent } from './ScheduleCard/ScheduleCard.component';
import { ServiceTypeCardComponent } from './ServiceTypeCard/ServiceTypeCard.component';
import { WorkDayCardComponent } from './WorkDayCard/WorkDayCard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountCardComponent,
    BarberCardComponent,
    CalendarCardComponent,
    ClientCardComponent,
    HistoryCardComponent,
    ScheduleCardComponent,
    ServiceTypeCardComponent,
    WorkDayCardComponent
  ],
  exports: [
    AccountCardComponent,
    BarberCardComponent,
    CalendarCardComponent,
    ClientCardComponent,
    HistoryCardComponent,
    ScheduleCardComponent,
    ServiceTypeCardComponent,
    WorkDayCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CardsModule { }