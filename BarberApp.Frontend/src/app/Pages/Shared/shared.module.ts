import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowPageModule } from './WorkFlowPage/work-flow-page.module';
import { ServicesPageModule } from './ServicesPage/services-page.module';
import { HomePageModule } from './HomePage/home-page.module';
import { ClientsPageModule } from './ClientsPage/clients-page.module';
import { AccountPageModule } from './AccountPage/account-page.module';
import { HistoryPageModule } from './HistoryPage/history-page.module';
import { DashboardPageModule } from './DashboardPage/dashboard-page.module';
import { SchedulesPageModule } from './SchedulesPage/schedules-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkFlowPageModule,
    ServicesPageModule,
    HomePageModule,
    ClientsPageModule,
    AccountPageModule,
    HistoryPageModule,
    DashboardPageModule,
    SchedulesPageModule
  ],
  exports: [
    CommonModule,
    WorkFlowPageModule,
    ServicesPageModule,
    HomePageModule,
    ClientsPageModule
  ],
})
export class SharedModule { }
