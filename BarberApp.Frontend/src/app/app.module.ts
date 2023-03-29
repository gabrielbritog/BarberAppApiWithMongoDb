import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// PAGES


// SERVICES
import { authInterceptorProviders } from './Helpers/AuthInterceptor';

// COMPONENTS


// COMPONENTS - CARDS


// MODALS
import { SchedulingModalComponent } from './Components/Modals/SchedulingModal/SchedulingModal.component';

// MISC
import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from 'ngx-currency';
import { DirectivesModule } from './Directives/directives.module';
import { PagesModule } from './Pages/pages.module';
import { ComponentsModule } from './Components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxCurrencyModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ timeOut: 2000, preventDuplicates: true }),

    DirectivesModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
