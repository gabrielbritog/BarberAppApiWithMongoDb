import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../Services/token-storage.service';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  sidebarExpanded = false;

  get showAdminBoard() {
    return !this.isBlocked && this.isAdmin && this.currentSection == 1;
  }

  get profilePic() {
    return this.loggedUser.urlImagem;
  }

  get currentSection() {
    return GlobalVariables.currentSection;
  }

  set currentSection(value) {
    GlobalVariables.currentSection = value;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  get isBlocked() {
    if (GlobalVariables.isAdmin && GlobalVariables.barbers.length == 0)
      return true;

    return false;
  }

  get timeHours() {
    return moment().format('HH');
  }

  get timeMinutes() {
    return moment().format('mm');
  }

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }


}
