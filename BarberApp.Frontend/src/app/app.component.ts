import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './Services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Barber-App';

  private roles: string[] = [];
  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  username = "";

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn)
      return;

    const user = this.tokenStorageService.getUser();
    // this.roles = user.roles;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
