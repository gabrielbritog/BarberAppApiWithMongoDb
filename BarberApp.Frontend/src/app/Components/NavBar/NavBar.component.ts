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

  get profilePic() {
    return this.loggedUser.urlImagem;
  }

  get expanded() {
    return GlobalVariables.accountExpanded;
  }

  set expanded(value) {
    GlobalVariables.accountExpanded = value;
  }

  get currentSection() {
    return GlobalVariables.currentSection;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/')
  }

}
