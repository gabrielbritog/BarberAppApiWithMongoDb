import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../Services/token-storage.service';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  sidebarExpanded = false;

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

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }


}
