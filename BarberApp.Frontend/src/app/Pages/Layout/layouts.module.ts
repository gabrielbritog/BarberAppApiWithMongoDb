import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './NavBar/NavBar.component';
import { SidebarComponent } from './Sidebar/Sidebar.component';
import { AdminBoardComponent } from './AdminBoard/AdminBoard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    NavBarComponent,
    SidebarComponent,
    AdminBoardComponent,
    FooterBarComponent,
  ],
  exports: [
    NavBarComponent,
    SidebarComponent,
    AdminBoardComponent,
    FooterBarComponent,
  ],
})
export class LayoutsModule { }
