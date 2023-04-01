import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule } from './Cards/cards.module';
import { LoaderComponent } from './Loader/Loader.component';
import { FormInputModule } from './FormInput/form-input.module';
import { ModalsModule } from './Modals/modals.module';
import { CarouselsModule } from './Carousels/carousels.module';
import { PlusButtonModule } from './PlusButton/plus-button.module';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [
    LoaderComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    CardsModule,
    CarouselsModule,
    FormInputModule,
    ModalsModule,
    PlusButtonModule
  ],
  exports: [
    LoaderComponent,
    LogoComponent,
    CommonModule,
    CardsModule,
    CarouselsModule,
    FormInputModule,
    ModalsModule,
    PlusButtonModule
  ],
})
export class ComponentsModule { }
