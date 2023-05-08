import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './HomePage.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../Components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
  ],
})
export class HomePageModule { }
