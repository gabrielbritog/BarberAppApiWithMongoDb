import { FormInputModule } from './../../../Components/FormInput/form-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesPageComponent } from './EmployeesPage.component';
import { EditEmployeeComponent } from './EditEmployee/EditEmployee.component';
import { ListEmployeeComponent } from './ListEmployee/ListEmployee.component';
import { NewEmployeeComponent } from './NewEmployee/NewEmployee.component';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [
    EmployeesPageComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    NewEmployeeComponent
  ],
  exports: [
    EmployeesPageComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    NewEmployeeComponent
  ],
})
export class EmployeesPageModule { }
