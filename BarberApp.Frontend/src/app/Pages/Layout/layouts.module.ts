import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './NavBar/NavBar.component';
import { SidebarComponent } from './Sidebar/Sidebar.component';
import { AdminBoardComponent } from './AdminBoard/AdminBoard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NavBarComponent,
    SidebarComponent,
    AdminBoardComponent,
  ],
  exports: [
    NavBarComponent,
    SidebarComponent,
    AdminBoardComponent,
  ],
})
export class LayoutsModule { }
