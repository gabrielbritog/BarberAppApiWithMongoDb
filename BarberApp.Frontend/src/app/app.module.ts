import { WorkDayCardComponent } from './Pages/HomePage/WorkFlowPage/WorkDayCard/WorkDayCard.component';

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
import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { AccountPageComponent } from './Pages/HomePage/AccountPage/AccountPage.component';
import { UserInfoComponent } from './Pages/HomePage/AccountPage/UserInfo/UserInfo.component';
import { EditNameComponent } from './Pages/HomePage/AccountPage/EditName/EditName.component';
import { EditEmailComponent } from './Pages/HomePage/AccountPage/EditEmail/EditEmail.component';
import { EditPasswordComponent } from './Pages/HomePage/AccountPage/EditPassword/EditPassword.component';
import { EditPhoneComponent } from './Pages/HomePage/AccountPage/EditPhone/EditPhone.component';
import { WorkFlowPageComponent } from './Pages/HomePage/WorkFlowPage/WorkFlowPage.component';
import { DashboardPageComponent } from './Pages/HomePage/DashboardPage/DashboardPage.component';

// SERVICES
import { authInterceptorProviders } from './Helpers/AuthInterceptor';

// COMPONENTS
import { LoaderComponent } from './Components/Loader/Loader.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { SidebarComponent } from './Components/NavBar/Sidebar/Sidebar.component';
import { AdminBoardComponent } from './Components/NavBar/AdminBoard/AdminBoard.component';
import { PlusButtonComponent } from './Components/PlusButton/PlusButton.component';
import { FormInputComponent } from './Components/FormInput/FormInput.component';

// COMPONENTS - CARDS
import { ScheduleCardComponent } from './Components/Cards/ScheduleCard/ScheduleCard.component';
import { CalendarCardComponent } from './Components/Cards/CalendarCard/CalendarCard.component';
import { ServiceTypeCardComponent } from './Components/Cards/ServiceTypeCard/ServiceTypeCard.component';
import { ClientCardComponent } from './Components/Cards/ClientCard/ClientCard.component';
import { BarberCardComponent } from './Components/Cards/BarberCard/BarberCard.component';
import { AccountCardComponent } from './Components/Cards/AccountCard/AccountCard.component';
import { HistoryCardComponent } from './Components/Cards/HistoryCard/HistoryCard.component';
import { CurrencyCursorDirective } from './Shared/CurrencyCursor.directive';

// COMPONENTS - CAROUSELS
import { CarouselAvailableTimeComponent } from './Components/Carousels/CarouselAvailableTime/CarouselAvailableTime.component';
import { CarouselServiceTypesComponent } from './Components/Carousels/CarouselServiceTypes/CarouselServiceTypes.component';


// SECTIONS
import { ClientListSectionComponent } from './Pages/HomePage/Sections/ClientListSection/ClientListSection.component';
import { ServiceTypesSectionComponent } from './Pages/HomePage/Sections/ServiceTypesSection/ServiceTypesSection.component';
import { SchedulesSectionComponent } from './Pages/HomePage/Sections/SchedulesSection/SchedulesSection.component';
import { BarbersSectionComponent } from './Pages/HomePage/Sections/BarbersSection/BarbersSection.component';
import { HistorySectionComponent } from './Pages/HomePage/Sections/HistorySection/HistorySection.component';

// MODALS
import { SchedulingModalComponent } from './Components/Modals/SchedulingModal/SchedulingModal.component';
import { ServiceTypeModalComponent } from './Components/Modals/ServiceTypeModal/ServiceTypeModal.component';
import { BarberModalComponent } from './Components/Modals/BarberModal/BarberModal.component';

// MISC
import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyCursorDirective,

    // PAGES
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,

    AccountPageComponent,
    UserInfoComponent,
    EditNameComponent,
    EditEmailComponent,
    EditPasswordComponent,
    EditPhoneComponent,

    WorkFlowPageComponent,
    DashboardPageComponent,


    // HOME SECTIONS
    SchedulesSectionComponent,
    ClientListSectionComponent,
    ServiceTypesSectionComponent,
    BarbersSectionComponent,
    HistorySectionComponent,

    // COMPONENTS
    NavBarComponent,
    SidebarComponent,
    AdminBoardComponent,
    FormInputComponent,

    ScheduleCardComponent,
    CalendarCardComponent,
    ClientCardComponent,
    ServiceTypeCardComponent,
    BarberCardComponent,
    AccountCardComponent,
    HistoryCardComponent,
    WorkDayCardComponent,

    LoaderComponent,
    PlusButtonComponent,
    CarouselAvailableTimeComponent,
    CarouselServiceTypesComponent,

    // MODAL
    SchedulingModalComponent,
    ServiceTypeModalComponent,
    BarberModalComponent
  ],
  imports: [
    NgxCurrencyModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 2000, preventDuplicates: true})
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
