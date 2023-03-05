import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-EmployeesPage',
  templateUrl: './EmployeesPage.component.html',
  styleUrls: ['../../Shared/Styles/basePage.scss', './EmployeesPage.component.scss']
})
export class EmployeesPageComponent implements OnInit {

  searchValue = "";

  get showModal() {
    return GlobalVariables.showBarberModal;
  };

  get barberList(){
    return GlobalVariables.barbers
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
    GlobalVariables.showBarberModal = true;
  }

  onCancel() {
    if (this.router.url == '/Account')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/Account');
  }

}
