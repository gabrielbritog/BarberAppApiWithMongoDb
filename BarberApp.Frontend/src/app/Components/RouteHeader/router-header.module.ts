import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteHeaderComponent } from './RouteHeader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RouteHeaderComponent
  ],
  exports: [
    RouteHeaderComponent
  ]
})
export class RouterHeaderModule { }
