import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

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

  get routerUrlArray() {
    const routerUrl = this.router.routerState.snapshot.url.split('/').slice(1);
    return routerUrl;
  }

  get currentRoute() {
    const routerUrl = this.router.routerState.snapshot.url;

    const routeNames = [
      '/Login',
      '/Register',
      '/Home',
      '/Dashboard',
      '/Schedules',
      '/History',
      '/WorkFlow',
      '/Employees',
      '/Employees/Edit',
      '/Employees/New',
      '/Services',
      '/Services/Edit',
      '/Services/New',
      '/Clients',
      '/Account',
      '/Account/Name',
      '/Account/Email',
      '/Account/Phone',
      '/Account/Password',
    ];

    const routeHeaderNames = [
      'Login',
      'Registrar',
      'Início',
      'Relatórios',
      'Agenda',
      'Histórico',
      'Horários',
      'Funcionários',
      'Editar Funcionário',
      'Novo Funcionário',
      'Serviços',
      'Editar Serviço',
      'Novo Serviço',
      'Clientes',
      'Perfil',
      'Alterar Nome',
      'Alterar Email',
      'Alterar Telefone',
      'Alterar Senha',
    ];

    const translatedRoute = routeHeaderNames[routeNames.indexOf(routerUrl)];

    return translatedRoute;
  }

  get isCurrentRouteChild() {
    const routerUrl = this.routerUrlArray;
    return routerUrl.length > 1;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  showSidebar() {
    GlobalVariables.showSidebar = !GlobalVariables.showSidebar;
  }

  onReturn() {
    const routerUrl = this.routerUrlArray;
    this.router.navigateByUrl(routerUrl[routerUrl.length - 2])
  }

  logout() {
    this.tokenStorage.signOut();
  }
}
