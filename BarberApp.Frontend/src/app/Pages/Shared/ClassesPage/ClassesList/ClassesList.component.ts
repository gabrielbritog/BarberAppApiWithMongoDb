import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ClassesList',
  templateUrl: './ClassesList.component.html',
  styleUrls: ['./ClassesList.component.css']
})
export class ClassesListComponent implements OnInit {
  get AllClasses(){
    return GlobalVariables.allClasses;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    GlobalVariables.selectedClass = undefined;
  }

  newClass() {
    this.router.navigateByUrl('/Classes/Details');
  }

}
