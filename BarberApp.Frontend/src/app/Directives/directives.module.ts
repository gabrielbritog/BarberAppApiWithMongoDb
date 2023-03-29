import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowScrollDetectorDirective } from './WindowScrollDetector/WindowScrollDetector.directive';
import { CurrencyCursorDirective } from './CurrencyCursor/CurrencyCursor.directive';



@NgModule({
  declarations: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective
  ],
  exports: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
