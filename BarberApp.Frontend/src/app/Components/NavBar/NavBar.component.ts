import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../Services/token-storage.service';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  get currentSection() {
    return GlobalVariables.currentSection;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

}
