import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './Pages/RegisterPage/RegisterPage.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './Services/Auth.service';
import { FormValidationService } from './Services/FormValidation.service';
import { authInterceptorProviders } from './Helpers/AuthInterceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 10000, preventDuplicates: true})
  ],
  providers: [FormValidationService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
