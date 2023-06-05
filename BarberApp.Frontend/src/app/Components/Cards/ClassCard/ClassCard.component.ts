import { Component, Input, OnInit } from '@angular/core';
import { ClassesModel } from 'src/app/Models/ClassesModel';
import { ClientModel } from '../../../Models/ClientModel';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ClassCard',
  templateUrl: './ClassCard.component.html',
  styleUrls: ['./ClassCard.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() classModel?: ClassesModel;

  constructor(private router: Router) {
    if (!this.classModel) {
      this.classModel = {
        name: 'Matemática - Segunda-feira',
        clientsId: [],
        servicesId: []
      }
    }
  }

  ngOnInit() {
  }

  editClass() {
    if(this.classModel){
      GlobalVariables.selectedClass = this.classModel;
      this.router.navigateByUrl('/Classes/Details')
    }
  }

}
