import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselAvailableTimeComponent } from './CarouselAvailableTime/CarouselAvailableTime.component';
import { CarouselServiceTypesComponent } from './CarouselServiceTypes/CarouselServiceTypes.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CarouselAvailableTimeComponent,
    CarouselServiceTypesComponent
  ],
  exports: [
    CarouselAvailableTimeComponent,
    CarouselServiceTypesComponent
  ],
})
export class CarouselsModule { }
