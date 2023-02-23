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

  set currentSection(value) {
    GlobalVariables.currentSection = value;
  }

  get loggedUser() {
    return this.tokenStorage.getUserModel();
  }

  get barberList() {
    return GlobalVariables.barbers.sort((a, b) => {
      const aMatches = a == this.selectedBarber;
      const bMatches = b == this.selectedBarber;
      if (aMatches && !bMatches) {
        return -1;
      } else if (!aMatches && bMatches) {
        return 1;
      } else {
        return a.firstName.localeCompare(b.firstName);
      }
    });
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  get selectedBarber() {
    return GlobalVariables.selectedBarber;
  }

  set selectedBarber(value) {
    GlobalVariables.selectedBarber = value;
  }

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/')
  }

  agendaExpanded = false;

  setAgenda(barber: any) {
    if (this.selectedBarber == barber){
      this.agendaExpanded = !this.agendaExpanded;
      return;
    }

    this.selectedBarber = barber;
    this.agendaExpanded = false;
  }

}
