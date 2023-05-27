import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table/default-table.component';
import { SearchBarModule } from '../SearchBar/search-bar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SearchBarModule,
    RouterModule
  ],
  declarations: [
    DefaultTableComponent
  ],
  exports: [
    DefaultTableComponent
  ]
})
export class TablesModule { }
