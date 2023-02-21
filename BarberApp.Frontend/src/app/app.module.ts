
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// PAGES
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './Pages/RegisterPage/RegisterPage.component';
import { AccountPageComponent } from './Pages/HomePage/AccountPage/AccountPage.component';
import { HomePageComponent } from './Pages/HomePage/HomePage.component';

// SERVICES
import { FormValidationService } from './Services/FormValidation.service';
import { authInterceptorProviders } from './Helpers/AuthInterceptor';

// COMPONENTS
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { ClientListSectionComponent } from './Pages/HomePage/Sections/ClientListSection/ClientListSection.component';
import { ServiceTypesSectionComponent } from './Pages/HomePage/Sections/ServiceTypesSection/ServiceTypesSection.component';
import { ScheduleCardComponent } from './Components/ScheduleCard/ScheduleCard.component';
import { CalendarCardComponent } from './Components/CalendarCard/CalendarCard.component';
import { SchedulesSectionComponent } from './Pages/HomePage/Sections/SchedulesSection/SchedulesSection.component';
import { LoaderComponent } from './Components/Loader/Loader.component';
import { PlusButtonComponent } from './Components/PlusButton/PlusButton.component';
import { ServiceTypeCardComponent } from './Components/ServiceTypeCard/ServiceTypeCard.component';
import { ClientCardComponent } from './Components/ClientCard/ClientCard.component';
import { CarouselAvailableTimeComponent } from './Components/Carousels/CarouselAvailableTime/CarouselAvailableTime.component';

// MODALS
import { SchedulingModalComponent } from './Components/Modals/SchedulingModal/SchedulingModal.component';
import { ServiceTypeModalComponent } from './Components/Modals/ServiceTypeModal/ServiceTypeModal.component';

// MISC
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,

    // PAGES
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AccountPageComponent,

    // HOME SECTIONS
    SchedulesSectionComponent,
    ClientListSectionComponent,
    ServiceTypesSectionComponent,

    // COMPONENTS
    NavBarComponent,
    ScheduleCardComponent,
    CalendarCardComponent,
    ClientCardComponent,
    ServiceTypeCardComponent,
    LoaderComponent,
    PlusButtonComponent,
    CarouselAvailableTimeComponent,

    // MODAL
    SchedulingModalComponent,
    ServiceTypeModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 2000, preventDuplicates: true})
  ],
  providers: [FormValidationService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
