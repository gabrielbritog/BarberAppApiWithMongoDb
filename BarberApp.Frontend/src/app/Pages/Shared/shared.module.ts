import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowPageModule } from './WorkFlowPage/work-flow-page.module';
import { ServicesPageModule } from './ServicesPage/services-page.module';
import { HomePageModule } from './HomePage/home-page.module';
import { ClientsPageModule } from './ClientsPage/clients-page.module';
import { AccountPageModule } from './AccountPage/account-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkFlowPageModule,
    ServicesPageModule,
    HomePageModule,
    ClientsPageModule,
    AccountPageModule
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
