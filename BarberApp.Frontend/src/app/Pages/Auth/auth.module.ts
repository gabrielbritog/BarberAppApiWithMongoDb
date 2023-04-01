import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './LoginPage/LoginPage.component';
import { RegisterPageComponent } from './RegisterPage/RegisterPage.component';
import { FormInputModule } from '../../Components/FormInput/form-input.module';
import { ComponentsModule } from 'src/app/Components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormInputModule,
    ComponentsModule
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ],
})
export class AuthModule { }
