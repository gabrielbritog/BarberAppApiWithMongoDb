import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table/default-table.component';
import { SearchBarModule } from '../SearchBar/search-bar.module';

@NgModule({
  imports: [
    CommonModule,
    SearchBarModule
  ],
  declarations: [
    DefaultTableComponent
  ],
  exports: [
    DefaultTableComponent
  ]
})
export class TablesModule { }
