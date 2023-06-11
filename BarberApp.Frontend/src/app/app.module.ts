import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// SERVICES
import { authInterceptorProviders } from './Helpers/AuthInterceptor';

// MISC
import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from 'ngx-currency';
import { DirectivesModule } from './Directives/directives.module';
import { PagesModule } from './Pages/pages.module';
import { ComponentsModule } from './Components/components.module';
import { ToasterComponent } from './Components/toaster/toaster.component';
import { SpinnerModule } from './Components/Spinner/spinner.module';
import { ModalsModule } from './Components/Modals/modals.module';


@NgModule({
  declarations: [
    AppComponent,
    ToasterComponent,
  ],
  imports: [
    NgxCurrencyModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerModule,
    ModalsModule,
    ToastrModule.forRoot({toastComponent: ToasterComponent, timeOut: 5000, preventDuplicates: true, progressBar: true }),

    DirectivesModule,
    PagesModule,
    ComponentsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [ToasterComponent],
})
export class AppModule { }
