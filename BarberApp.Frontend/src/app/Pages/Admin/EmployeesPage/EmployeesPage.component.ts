import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';
import { LoadAppService } from 'src/app/Services/api/LoadApp.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-EmployeesPage',
  templateUrl: './EmployeesPage.component.html',
  styleUrls: ['../../Styles/basePage.scss', './EmployeesPage.component.scss']
})
export class EmployeesPageComponent implements OnInit {
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }

  searchValue = "";

  get headerUrl() {
    let header = 'Funcionários'
    const route = this.router.url.split('/');
    const lastRoute = route[2];
    switch (lastRoute) {
      case 'New':
        header = 'Novo Funcionário'
        break;
      case 'Edit':
        header = 'Editar Funcionário'
        break;

      default:
        break;
    }

    return header;
  }

  get showModal() {
    return GlobalVariables.showBarberModal;
  };

  get barberList() {
    return GlobalVariables.employees
      .filter(p =>
        (p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
        p.phoneNumber?.toLowerCase().includes(this.searchValue.toLowerCase())
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  get isUserLevelManager() {
    return GlobalVariables.userLevel <= environment.userLevel.manager;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    if (!this.isUserLevelManager)
      this.router.navigateByUrl('/Schedules');
  }

  newBarber() {
    GlobalVariables.showBarberModal = true;
  }

  onCancel() {
    if (this.router.url == '/Employees') {
      if (GlobalVariables.employees.length > 0)
        this.router.navigateByUrl('/Home');
    }
    else
      this.router.navigateByUrl('/Employees');
  }

}
