import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './FormInput.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../Directives/directives.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [
    FormInputComponent
  ],
  exports: [
    FormInputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgxCurrencyModule
  ]
})
export class FormInputModule { }
