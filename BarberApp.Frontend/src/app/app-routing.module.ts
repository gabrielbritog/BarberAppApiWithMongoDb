import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './Pages/RegisterPage/RegisterPage.component';
import { AccountPageComponent } from './Pages/HomePage/AccountPage/AccountPage.component';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'Register', component: RegisterPageComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Account', component: AccountPageComponent },
  { path: '', redirectTo: '/Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
