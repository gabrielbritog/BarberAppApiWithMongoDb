import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { NavBarComponent } from '../NavBar.component';
import { UserConfig } from '../../../Models/UserConfig';
import { AuthService } from '../../../Services/Auth.service';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() navBar!: NavBarComponent;

  _document = document.documentElement;

  userConfig = new UserConfig(this.tokenStorage.getUserModel().userConfig);

  get fontsize() { return parseInt(this.userConfig.fontSize); }
  set fontsize(value) {
    const minValue = 14;
    const maxValue = 18;
    value = Math.max(minValue, Math.min(maxValue, value));
    this.userConfig.fontSize = value + "px";
    this.updateUserConfig();
  }

  get darkMode() { return this.userConfig.darkmode; }
  set darkMode(value) {
    this.userConfig.darkmode = value;
    this.updateUserConfig();
  }

  get primaryColor() { return this.userConfig.primaryColor; }
  set primaryColor(value) {
    this.userConfig.primaryColor = value;
    this.updateUserConfig();
  }

  get secondaryColor() { return this.userConfig.secondaryColor; }
  set secondaryColor(value) {
    this.userConfig.secondaryColor = value;
    this.updateUserConfig();
  }

  get accountPageExpanded() {
    return GlobalVariables.accountExpanded;
  }

  set accountPageExpanded(value) {
    GlobalVariables.accountExpanded = value;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private authService: AuthService
  ) {  }

  ngOnInit() {
  }

  closeSidebar() {
    this.navBar.sidebarExpanded = false;
  }

  logout() {
    this.tokenStorage.signOut();
    GlobalVariables.loadUserConfig(new UserConfig());
    this.router.navigateByUrl('/')
  }

  updateUserConfig() {
    const API_CALL = GlobalVariables.isAdmin ? this.authService.updateAdminUserConfig(this.userConfig) : this.authService.updateBarberUserConfig(this.userConfig);

    API_CALL.subscribe({
      next: (data: any) => {
        this.tokenStorage.saveUser(data.data);
        GlobalVariables.loadUserConfig(this.userConfig);
      },
      error: (err: any) => console.log(err)
    })
  }
}
