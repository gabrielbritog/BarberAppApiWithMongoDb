import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule } from './Cards/cards.module';
import { FormInputModule } from './FormInput/form-input.module';
import { ModalsModule } from './Modals/modals.module';
import { PlusButtonModule } from './PlusButton/plus-button.module';
import { LogoComponent } from './logo/logo.component';
import { TablesModule } from './Tables/Tables.module';



@NgModule({
  declarations: [
    LogoComponent,
  ],
  imports: [
    CommonModule,
    CardsModule,
    FormInputModule,
    ModalsModule,
    PlusButtonModule,
    TablesModule
  ],
  exports: [
    LogoComponent,
    CommonModule,
    CardsModule,
    FormInputModule,
    ModalsModule,
    PlusButtonModule,
    TablesModule
  ],
})
export class ComponentsModule { }
