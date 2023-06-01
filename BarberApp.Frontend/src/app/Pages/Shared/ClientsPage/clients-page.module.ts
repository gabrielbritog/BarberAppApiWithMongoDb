import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPageComponent } from './ClientsPage.component';
import { ListClientsComponent } from './ListClients/ListClients.component';
import { NewClientComponent } from './NewClient/NewClient.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../Components/components.module';
import { FormsModule } from '@angular/forms';
import { EditClientComponent } from './EditClient/EditClient.component';
import { DetailsClientComponent } from './DetailsClient/DetailsClient.component';
import { AvaliationClientComponent } from './AvaliationClient/AvaliationClient.component';
import { HistoryClientComponent } from './HistoryClient/HistoryClient.component';



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
    NewClientComponent,
    EditClientComponent,
    DetailsClientComponent,
    AvaliationClientComponent,
    HistoryClientComponent
  ],
  exports: [
    ClientsPageComponent,
    ListClientsComponent,
    NewClientComponent,
    EditClientComponent,
    DetailsClientComponent,
    AvaliationClientComponent,
    HistoryClientComponent
  ],
})
export class ClientsPageModule { }
