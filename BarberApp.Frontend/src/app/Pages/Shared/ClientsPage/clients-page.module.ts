import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPageComponent } from './ClientsPage.component';
import { ListClientsComponent } from './ListClients/ListClients.component';
import { NewClientComponent } from './NewClient/NewClient.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [
    ClientsPageComponent,
    ListClientsComponent,
    NewClientComponent
  ],
  exports: [
    ClientsPageComponent,
    ListClientsComponent,
    NewClientComponent
  ],
})
export class ClientsPageModule { }
