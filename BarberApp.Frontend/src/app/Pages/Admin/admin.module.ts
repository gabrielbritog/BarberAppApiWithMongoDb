import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesPageModule } from './EmployeesPage/employees-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeesPageModule
  ],
  exports: [
    EmployeesPageModule
  ],

})
export class AdminModule { }
