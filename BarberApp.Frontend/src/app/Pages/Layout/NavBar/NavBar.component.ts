import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserConfig } from 'src/app/Models/UserConfig';
import { UserService } from 'src/app/Services/user/User.service';
import { RouteHistoryService } from '../../../Services/misc/route-history.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  userConfig: UserConfig;

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

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) {
    const userConfig = this.tokenStorage.getUserModel();

    this.userConfig = userConfig ? new UserConfig(this.tokenStorage.getUserModel().userConfig) : new UserConfig();
  }

  ngOnInit() {
  }

  showSidebar() {
    GlobalVariables.showSidebar = !GlobalVariables.showSidebar;
  }

  changeDarkmode() {
    this.darkMode = !this.darkMode;
  }

  logout() {
    this.tokenStorage.signOut();
  }

  get darkMode() { return this.userConfig.darkmode; }
  set darkMode(value) {
    this.userConfig = new UserConfig(this.tokenStorage.getUserModel().userConfig);
    this.userConfig.darkmode = value;

    this.updateUserConfig();
  }

  updateUserConfig() {

    const API_CALL = this.userService.updateUserConfig(this.userConfig);

    API_CALL.subscribe({
      next: (data: any) => {
        this.tokenStorage.saveUser(data.data);
        GlobalVariables.loadUserConfig(this.userConfig);
      },
      error: (err: any) => console.log(err)
    })
  }
}
