import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../Services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-UserInfo',
  templateUrl: './UserInfo.component.html',
  styleUrls: ['../AccountPage.component.scss','./UserInfo.component.scss']
})
export class UserInfoComponent implements OnInit {

  get userInfo() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToRoute(route: string) {
    this.router.navigateByUrl(`/Account/${route}`);
  }

}
