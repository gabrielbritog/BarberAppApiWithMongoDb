import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-ClassesList',
  templateUrl: './ClassesList.component.html',
  styleUrls: ['./ClassesList.component.css']
})
export class ClassesListComponent implements OnInit {
  get AllClasses(){
    return GlobalVariables.allClasses;
  }

  constructor() { }

  ngOnInit() {
  }

}
