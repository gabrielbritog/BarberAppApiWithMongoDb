import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { AdminBoardComponent } from '../AdminBoard/AdminBoard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  get profilePic() {
    return this.loggedUser.urlImage;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  get timeHours() {
    return moment().format('HH');
  }

  get timeMinutes() {
    return moment().format('mm');
  }

  get currentRoute() {
    const routerUrl = this.router.url.split('/');
    return routerUrl[routerUrl.length - 1];
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  showSidebar() {
    GlobalVariables.showSidebar = !GlobalVariables.showSidebar;
  }
}
