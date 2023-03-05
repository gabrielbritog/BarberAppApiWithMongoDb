import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-ListEmployee',
  templateUrl: './ListEmployee.component.html',
  styleUrls: ['./ListEmployee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  searchValue = "";

  get barberList(){
    return GlobalVariables.barbers
    .filter(p =>
      (p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
      p.phoneNumber?.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  constructor( ) { }

  ngOnInit() {
  }

  newBarber() {
    GlobalVariables.showBarberModal = true;
  }

}
