import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './Pages/RegisterPage/RegisterPage.component';
import { AccountPageComponent } from './Pages/AccountPage/AccountPage.component';
import { EditNameComponent } from './Pages/AccountPage/EditName/EditName.component';
import { UserInfoComponent } from './Pages/AccountPage/UserInfo/UserInfo.component';
import { EditPasswordComponent } from './Pages/AccountPage/EditPassword/EditPassword.component';
import { EditPhoneComponent } from './Pages/AccountPage/EditPhone/EditPhone.component';
import { EditEmailComponent } from './Pages/AccountPage/EditEmail/EditEmail.component';
import { WorkFlowPageComponent } from './Pages/WorkFlowPage/WorkFlowPage.component';
import { EmployeesPageComponent } from './Pages/EmployeesPage/EmployeesPage.component';
import { ServicesPageComponent } from './Pages/ServicesPage/ServicesPage.component';
import { ClientsPageComponent } from './Pages/ClientsPage/ClientsPage.component';
import { EditEmployeeComponent } from './Pages/EmployeesPage/EditEmployee/EditEmployee.component';
import { ListEmployeeComponent } from './Pages/EmployeesPage/ListEmployee/ListEmployee.component';
import { NewEmployeeComponent } from './Pages/EmployeesPage/NewEmployee/NewEmployee.component';
import { ListClientsComponent } from './Pages/ClientsPage/ListClients/ListClients.component';
import { ListServiceComponent } from './Pages/ServicesPage/ListService/ListService.component';
import { EditServiceComponent } from './Pages/ServicesPage/EditService/EditService.component';
import { NewServiceComponent } from './Pages/ServicesPage/NewService/NewService.component';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'Register', component: RegisterPageComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'WorkFlow', component: WorkFlowPageComponent },
  { path: 'Employees', component: EmployeesPageComponent , children: [
    {path: '', component: ListEmployeeComponent},
    {path: 'Edit', component: EditEmployeeComponent},
    {path: 'New', component: NewEmployeeComponent},
  ] },
  { path: 'Services', component: ServicesPageComponent , children: [
    {path: '', component: ListServiceComponent},
    {path: 'Edit', component: EditServiceComponent},
    {path: 'New', component: NewServiceComponent},
  ] },
  {
    path: 'Clients', component: ClientsPageComponent, children: [
    {path: '', component: ListClientsComponent},
  ] },
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
