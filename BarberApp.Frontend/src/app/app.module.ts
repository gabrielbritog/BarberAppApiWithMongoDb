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
import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { ClientListSectionComponent } from './Pages/HomePage/Sections/ClientListSection/ClientListSection.component';
import { SchedulingModalComponent } from './Components/Modals/SchedulingModal/SchedulingModal.component';
import { ServiceTypesSectionComponent } from './Pages/HomePage/Sections/ServiceTypesSection/ServiceTypesSection.component';
import { ScheduleCardComponent } from './Components/ScheduleCard/ScheduleCard.component';
import { CalendarCardComponent } from './Components/CalendarCard/CalendarCard.component';
import { SchedulesSectionComponent } from './Pages/HomePage/Sections/SchedulesSection/SchedulesSection.component';

@NgModule({
  declarations: [
    AppComponent,

    // PAGES
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,

    // HOME SECTIONS
    SchedulesSectionComponent,
    ClientListSectionComponent,
    ServiceTypesSectionComponent,

    // COMPONENTS
    NavBarComponent,
    ScheduleCardComponent,
    CalendarCardComponent,

    // MODAL
    SchedulingModalComponent
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
