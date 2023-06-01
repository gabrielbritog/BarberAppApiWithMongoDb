import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSectionComponent } from 'src/app/Pages/Shared/DashboardPage/DashboardSection.component';
import { FormsModule } from '@angular/forms';
import { CardsModule } from '../../../Components/Cards/cards.module';
import { TablesModule } from 'src/app/Components/Tables/Tables.module';
import { RouterHeaderModule } from 'src/app/Components/RouteHeader/router-header.module';



@NgModule({
  declarations: [
    DashboardSectionComponent,
  ],
  exports: [
    DashboardSectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardsModule,
    TablesModule,
    RouterHeaderModule
  ]
})
export class DashboardPageModule { }
