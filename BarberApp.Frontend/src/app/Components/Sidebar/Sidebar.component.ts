import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserConfig } from '../../Models/UserConfig';
import { UserService } from '../../Services/User.service';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userConfig = new UserConfig(this.tokenStorage.getUserModel().userConfig);

  get showSidebar(){
    return GlobalVariables.showSidebar;
  }

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

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.setBodyScroll(true);
  }

  ngOnInit() {
    this.setBodyScroll(false);
  }

  setBodyScroll(value: boolean) {
    const bodyElement = document.body;
    if (!value)
      bodyElement.classList.add('sidebarOpen')
    else
      bodyElement.classList.remove('sidebarOpen')
  }

  closeSidebar() {
    const baseElement = document.getElementById('base-bg');
    const animationDelay = 200;

    if (baseElement)
      baseElement.classList.add('collapse')

    setTimeout(() => GlobalVariables.showSidebar = false , animationDelay);
  }

  logout() {
    this.tokenStorage.signOut();
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
