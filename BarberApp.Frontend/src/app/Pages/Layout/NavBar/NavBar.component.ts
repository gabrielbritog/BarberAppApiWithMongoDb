import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { Router } from '@angular/router';
import { UserConfig } from 'src/app/Models/UserConfig';
import { UserService } from 'src/app/Services/user/User.service';

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
      '/Schedules/Details',
      '/History',
      '/WorkFlow',
      '/Employees',
      '/Employees/Edit',
      '/Employees/New',
      '/Services',
      '/Services/Edit',
      '/Services/New',
      '/Classes',
      '/Classes/Details',
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
      'Agendamento',
      'Histórico',
      'Horários',
      'Funcionários',
      'Editar Funcionário',
      'Novo Funcionário',
      'Serviços',
      'Editar Serviço',
      'Novo Serviço',
      'Turmas',
      this.isAdmin? 'Editar Turma' : 'Detalhes da turma',
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

  onReturn() {
    const routerUrl = this.routerUrlArray;
    this.router.navigateByUrl(routerUrl[routerUrl.length - 2])
  }

  changeDarkmode() {
    this.darkMode = !this.darkMode;
  }

  logout() {
    this.tokenStorage.signOut();
  }

  get darkMode() { return this.userConfig.darkmode; }
  set darkMode(value) {
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
