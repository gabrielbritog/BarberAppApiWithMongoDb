import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowScrollDetectorDirective } from './WindowScrollDetector/WindowScrollDetector.directive';
import { CurrencyCursorDirective } from './CurrencyCursor/CurrencyCursor.directive';
import { MiscConditionsDirective } from './MiscConditions/MiscConditions.directive';



@NgModule({
  declarations: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective,
    MiscConditionsDirective
   ],
  exports: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective,
    MiscConditionsDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
