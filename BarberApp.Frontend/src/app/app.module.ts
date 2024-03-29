import { WorkDayCardComponent } from './Pages/WorkFlowPage/WorkDayCard/WorkDayCard.component';

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

import { WorkFlowPageComponent } from './Pages/WorkFlowPage/WorkFlowPage.component';

import { AccountPageComponent } from './Pages/AccountPage/AccountPage.component';
import { UserInfoComponent } from './Pages/AccountPage/UserInfo/UserInfo.component';
import { EditNameComponent } from './Pages/AccountPage/EditName/EditName.component';
import { EditEmailComponent } from './Pages/AccountPage/EditEmail/EditEmail.component';
import { EditPasswordComponent } from './Pages/AccountPage/EditPassword/EditPassword.component';
import { EditPhoneComponent } from './Pages/AccountPage/EditPhone/EditPhone.component';

import { EmployeesPageComponent } from './Pages/EmployeesPage/EmployeesPage.component';
import { ListEmployeeComponent } from './Pages/EmployeesPage/ListEmployee/ListEmployee.component';
import { EditEmployeeComponent } from './Pages/EmployeesPage/EditEmployee/EditEmployee.component';
import { NewEmployeeComponent } from './Pages/EmployeesPage/NewEmployee/NewEmployee.component';

import { ClientsPageComponent } from './Pages/ClientsPage/ClientsPage.component';
import { ListClientsComponent } from './Pages/ClientsPage/ListClients/ListClients.component';

import { ServicesPageComponent } from './Pages/ServicesPage/ServicesPage.component';
import { ListServiceComponent } from './Pages/ServicesPage/ListService/ListService.component';
import { EditServiceComponent } from './Pages/ServicesPage/EditService/EditService.component';
import { NewServiceComponent } from './Pages/ServicesPage/NewService/NewService.component';

// SERVICES
import { authInterceptorProviders } from './Helpers/AuthInterceptor';

// COMPONENTS
import { LoaderComponent } from './Components/Loader/Loader.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { SidebarComponent } from './Components/Sidebar/Sidebar.component';
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
import { DashboardSectionComponent } from './Pages/HomePage/Sections/DashboardSection/DashboardSection.component';
import { SchedulesSectionComponent } from './Pages/HomePage/Sections/SchedulesSection/SchedulesSection.component';
import { HistorySectionComponent } from './Pages/HomePage/Sections/HistorySection/HistorySection.component';

// MODALS
import { SchedulingModalComponent } from './Components/Modals/SchedulingModal/SchedulingModal.component';

// MISC
import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from 'ngx-currency';
import { WindowScrollDetectorDirective } from './Shared/WindowScrollDetector.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyCursorDirective,
    WindowScrollDetectorDirective,

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

    EmployeesPageComponent,
    ListEmployeeComponent,
    EditEmployeeComponent,
    NewEmployeeComponent,

    ClientsPageComponent,
    ListClientsComponent,

    ServicesPageComponent,
    ListServiceComponent,
    EditServiceComponent,
    NewServiceComponent,

    WorkFlowPageComponent,


    // HOME SECTIONS
    DashboardSectionComponent,
    SchedulesSectionComponent,
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
    SchedulingModalComponent
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
