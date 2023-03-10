import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListEmployee',
  templateUrl: './ListEmployee.component.html',
  styleUrls: ['./ListEmployee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  searchValue = "";

  get barberList(){
    return GlobalVariables.employees
    .filter(p =>
      (p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
      p.phoneNumber?.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  constructor(
    private router: Router
   ) { }

  ngOnInit() {
  }

  newBarber() {
    this.router.navigateByUrl('/Employees/New');
  }

}
