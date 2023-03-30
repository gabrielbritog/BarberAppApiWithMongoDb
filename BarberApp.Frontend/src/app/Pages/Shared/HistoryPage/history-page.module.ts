import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPage } from './HistorySection.component';
import { FormsModule } from '@angular/forms';
import { CardsModule } from '../../../Components/Cards/cards.module';



@NgModule({
  declarations: [
    HistoryPage
  ],
  exports: [
    HistoryPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardsModule
  ]
})
export class HistoryPageModule { }
