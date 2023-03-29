import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './ServicesPage.component';
import { EditServiceComponent } from './EditService/EditService.component';
import { ListServiceComponent } from './ListService/ListService.component';
import { NewServiceComponent } from './NewService/NewService.component';
import { FormInputModule } from '../../../Components/FormInput/form-input.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormInputModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [
    ServicesPageComponent,
    EditServiceComponent,
    ListServiceComponent,
    NewServiceComponent,
  ],
  exports: [
    ServicesPageComponent,
    EditServiceComponent,
    ListServiceComponent,
    NewServiceComponent,
  ],
})
export class ServicesPageModule { }
