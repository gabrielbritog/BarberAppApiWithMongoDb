import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowScrollDetectorDirective } from './WindowScrollDetector/WindowScrollDetector.directive';
import { CurrencyCursorDirective } from './CurrencyCursor/CurrencyCursor.directive';
import { MiscConditionsDirective } from './MiscConditions/MiscConditions.directive';
import { TooltipDirective } from './Tooltip/tooltip.directive';



@NgModule({
  declarations: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective,
    MiscConditionsDirective,
    TooltipDirective
   ],
  exports: [
    WindowScrollDetectorDirective,
    CurrencyCursorDirective,
    MiscConditionsDirective,
    TooltipDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
