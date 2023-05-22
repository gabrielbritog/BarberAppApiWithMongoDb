import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './AccountPage.component';
import { EditEmailComponent } from './EditEmail/EditEmail.component';
import { EditPasswordComponent } from './EditPassword/EditPassword.component';
import { EditPhoneComponent } from './EditPhone/EditPhone.component';
import { UserInfoComponent } from './UserInfo/UserInfo.component';
import { RouterModule } from '@angular/router';
import { FormInputModule } from '../../../Components/FormInput/form-input.module';
import { CardsModule } from '../../../Components/Cards/cards.module';
import { EditNameComponent } from './EditName/EditName.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    AccountPageComponent,
    EditEmailComponent,
    EditPasswordComponent,
    EditPhoneComponent,
    UserInfoComponent,
    EditNameComponent,
  ],
  exports: [
    AccountPageComponent,
    EditEmailComponent,
    EditPasswordComponent,
    EditPhoneComponent,
    EditNameComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    FormInputModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    CardsModule
  ]
})
export class AccountPageModule { }
