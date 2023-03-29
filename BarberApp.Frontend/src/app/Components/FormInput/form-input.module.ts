import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './FormInput.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../Directives/directives.module';
import { NgxCurrencyModule } from 'ngx-currency';



@NgModule({
  declarations: [
    FormInputComponent
  ],
  exports: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgxCurrencyModule
  ]
})
export class FormInputModule { }
