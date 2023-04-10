import { Component, Input, OnInit } from '@angular/core';
import { ClassesModel } from 'src/app/Models/ClassesModel';
import { ClientModel } from '../../../Models/ClientModel';

@Component({
  selector: 'app-ClassCard',
  templateUrl: './ClassCard.component.html',
  styleUrls: ['./ClassCard.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() classModel?: ClassesModel;

  constructor() {
    if (!this.classModel) {
      this.classModel = {
        name: 'Matemática - Segunda-feira',
        clients: [],
        presence: [],
        date: ''
      }
    }
  }

  ngOnInit() {
  }

}
