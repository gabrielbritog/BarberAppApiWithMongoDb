import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPageComponent } from './ClientsPage.component';
import { ListClientsComponent } from './ListClients/ListClients.component';
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
    ListClientsComponent
  ],
  exports: [
    ClientsPageComponent,
    ListClientsComponent
  ],
})
export class ClientsPageModule { }
