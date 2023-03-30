import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSectionComponent } from 'src/app/Pages/Shared/DashboardPage/DashboardSection.component';
import { FormsModule } from '@angular/forms';
import { CardsModule } from '../../../Components/Cards/cards.module';



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
    CardsModule
  ]
})
export class DashboardPageModule { }
