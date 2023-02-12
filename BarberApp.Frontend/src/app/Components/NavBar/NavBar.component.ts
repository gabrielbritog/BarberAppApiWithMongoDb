import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../Services/token-storage.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

}
