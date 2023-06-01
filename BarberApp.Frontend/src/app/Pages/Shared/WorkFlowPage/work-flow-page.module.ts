import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowPageComponent } from './WorkFlowPage.component';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterHeaderModule } from 'src/app/Components/RouteHeader/router-header.module';



@NgModule({
  declarations: [
    WorkFlowPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterHeaderModule
  ]
})
export class WorkFlowPageModule { }
