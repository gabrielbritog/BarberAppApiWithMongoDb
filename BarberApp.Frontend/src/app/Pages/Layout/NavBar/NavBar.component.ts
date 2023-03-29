import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  get showSidebar() {
    return GlobalVariables.showSidebar;
  }

  set showSidebar(value) {
    GlobalVariables.showSidebar = value;
  }

  get showAdminBoard() {
    return !this.isBlocked && this.isAdmin && (this.currentSection == 1 || this.currentSection == 2);
  }

  get profilePic() {
    return this.loggedUser.urlImage;
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
    if (GlobalVariables.isAdmin && GlobalVariables.employees.length == 0)
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
