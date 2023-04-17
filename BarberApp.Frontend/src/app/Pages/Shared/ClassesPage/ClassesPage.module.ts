import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesPageComponent } from './ClassesPage.component';
import { RouterModule } from '@angular/router';
import { CardsModule } from '../../../Components/Cards/cards.module';
import { ClassesListComponent } from './ClassesList/ClassesList.component';
import { ClassDetailsComponent } from './ClassDetails/ClassDetails.component';
import { FormsModule } from '@angular/forms';
import { PlusButtonModule } from '../../../Components/PlusButton/plus-button.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardsModule,
    FormsModule,
    PlusButtonModule
  ],
  declarations: [
    ClassesPageComponent,
    ClassDetailsComponent,
    ClassesListComponent,
  ]
})
export class ClassesPageModule { }
