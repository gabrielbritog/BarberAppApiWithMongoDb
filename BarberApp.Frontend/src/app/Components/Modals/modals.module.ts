import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputModule } from '../FormInput/form-input.module';
import { InputModalComponent } from './input-modal/input-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    InputModalComponent
  ],
  exports: [
    InputModalComponent
  ],
  imports: [
    CommonModule,
    FormInputModule,
    ModalModule.forRoot()
  ]
})
export class ModalsModule { }
