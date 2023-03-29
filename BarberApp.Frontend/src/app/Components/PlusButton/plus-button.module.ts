import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusButtonComponent } from './PlusButton.component';



@NgModule({
  declarations: [
    PlusButtonComponent
  ],
  exports: [
    PlusButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlusButtonModule { }
