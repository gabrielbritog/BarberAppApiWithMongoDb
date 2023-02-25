import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './Pages/RegisterPage/RegisterPage.component';
import { AccountPageComponent } from './Pages/HomePage/AccountPage/AccountPage.component';
import { EditNameComponent } from './Pages/HomePage/AccountPage/EditName/EditName.component';
import { UserInfoComponent } from './Pages/HomePage/AccountPage/UserInfo/UserInfo.component';
import { EditPasswordComponent } from './Pages/HomePage/AccountPage/EditPassword/EditPassword.component';
import { EditPhoneComponent } from './Pages/HomePage/AccountPage/EditPhone/EditPhone.component';
import { EditEmailComponent } from './Pages/HomePage/AccountPage/EditEmail/EditEmail.component';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'Register', component: RegisterPageComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Account', component: AccountPageComponent, children: [
    {path: '', component: UserInfoComponent},
    {path: 'Name', component: EditNameComponent},
    {path: 'Email', component: EditEmailComponent},
    {path: 'Phone', component: EditPhoneComponent},
    {path: 'Password', component: EditPasswordComponent},
  ] },
  { path: '', redirectTo: '/Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
