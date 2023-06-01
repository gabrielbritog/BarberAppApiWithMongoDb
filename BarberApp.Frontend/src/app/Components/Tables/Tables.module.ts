import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table/default-table.component';
import { SearchBarModule } from '../SearchBar/search-bar.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SearchBarModule,
    RouterModule,
    DirectivesModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    DefaultTableComponent
  ],
  exports: [
    DefaultTableComponent
  ]
})
export class TablesModule { }
