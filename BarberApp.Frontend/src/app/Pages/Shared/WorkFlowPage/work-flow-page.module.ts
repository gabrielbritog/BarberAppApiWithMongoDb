import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowPageComponent } from './WorkFlowPage.component';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkFlowPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule
  ]
})
export class WorkFlowPageModule { }
