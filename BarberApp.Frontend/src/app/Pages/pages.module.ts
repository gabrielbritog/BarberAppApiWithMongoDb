import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './Layout/layouts.module';
import { AuthModule } from './Auth/auth.module';
import { ComponentsModule } from '../Components/components.module';
import { SharedModule } from './Shared/shared.module';
import { AdminModule } from './Admin/admin.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsModule,
    AuthModule,
    ComponentsModule,
    SharedModule,
    AdminModule
  ],
  exports: [
    LayoutsModule,
    AuthModule,
    ComponentsModule,
    SharedModule,
    AdminModule
  ],
})
export class PagesModule { }
