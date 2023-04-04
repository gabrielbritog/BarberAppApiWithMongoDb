import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../Services/auth/token-storage.service';

@Component({
  selector: 'app-AdminBoard',
  templateUrl: './AdminBoard.component.html',
  styleUrls: ['./AdminBoard.component.scss']
})
export class AdminBoardComponent implements OnInit {
  private static router: Router;
  static get show() {
    const isAdmin = GlobalVariables.isAdmin;
    const routeUrl = this.router.url.split('/');
    const lastRouteUrl = routeUrl[routeUrl.length-1];
    const routesWithAdminBoard = ['History', 'Schedules', 'Services']

    if (!isAdmin){
      return false;
    }

    if (GlobalVariables.employees.length == 0){
      return false;
    }

    if (!routesWithAdminBoard.some(p => lastRouteUrl == p)){
      return false;
    }


    return true;
  };

  get show() {return AdminBoardComponent.show}

  agendaExpanded = false;


  get barberList() {
    return GlobalVariables.employees.sort((a, b) => {
      if (a.firstName < b.firstName)
        return -1;

      if (a.firstName > b.firstName)
        return 1;

      return 0;
    });
  }

  get selectedBarber() {
    return GlobalVariables.selectedBarber;
  }

  set selectedBarber(value) {
    if (value != GlobalVariables.selectedBarber)
      GlobalVariables.getEmptySchedulesBase();

    GlobalVariables.selectedBarber = value;
  }

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { AdminBoardComponent.router = router }

  ngOnInit() {
  }


  setAgenda(barber: any) {
    if (this.barberList.length <= 1)
      return;

    this.selectedBarber = barber;
  }

}
