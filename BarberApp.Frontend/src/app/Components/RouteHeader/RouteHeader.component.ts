import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteHistoryService } from '../../Services/misc/route-history.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { InputModalService } from '../Modals/input-modal/input-modal.service';
import { ModalOptions } from '../Modals/input-modal/modal-options';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { KeyValue } from '@angular/common';
import { environment } from 'src/app/Helpers/environment';
import { UserService } from '../../Services/user/User.service';

@Component({
  selector: 'app-RouteHeader',
  templateUrl: './RouteHeader.component.html',
  styleUrls: ['./RouteHeader.component.css']
})
export class RouteHeaderComponent implements OnInit {
  @Input() showOn: 'mobile' | 'desktop' = 'mobile';
  @Input() margin: boolean = true;

  readonly dynamicRoutes = environment.dynamicRoutes;

  get isAdmin() {
    return this.tokenStorage.isAdmin();
  }

  constructor(
    private router: Router,
    private routeHistory: RouteHistoryService,
    private tokenStorage: TokenStorageService,
    private InputModalService: InputModalService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  get routerUrlArray() {
    const routerUrl = this.router.routerState.snapshot.url.split('/').slice(1);
    return routerUrl;
  }

  get currentRoute() {
    // const routerUrl = this.router.routerState.snapshot.url;
    const routerUrl = this.router.routerState.snapshot.url.split('/', 3).toString().replaceAll(',', '/');

    const routeNames = [
      '/Login',
      '/Register',
      '/Home',
      '/Dashboard',
      '/Schedules',
      '/Schedules/Details',
      '/Schedules/Presence',
      '/Schedules/New',
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
      '/Classes/New',
      '/Clients',
      '/Clients/New',
      '/Clients/Edit',
      '/Clients/History',
      '/Clients/Avaliation',
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
      'Lista de presença',
      'Novo Agendamento',
      'Histórico',
      'Horários',
      'Funcionários',
      'Editar Funcionário',
      'Novo Funcionário',
      'Serviços',
      'Editar Serviço',
      'Novo Serviço',
      GlobalVariables.companyUserConfig?.pageTitles?.routeClasses?? 'Turmas',
      this.isAdmin? `Editar` : 'Detalhes',
      'Novo',
      GlobalVariables.companyUserConfig?.pageTitles?.routeClients?? 'Alunos',
      'Novo',
      this.isAdmin? 'Editar' : 'Detalhes',
      'Aulas',
      'Ficha de Avaliação',
      'Novo',
      'Perfil',
      'Alterar Nome',
      'Alterar Email',
      'Alterar Telefone',
      'Alterar Senha',
    ];

    const translatedRoute = routeHeaderNames[routeNames.indexOf(routerUrl)];

    return translatedRoute;
  }

  get isDynamicRoute() {
    const routerUrl = this.router.routerState.snapshot.url.split('/', 3).toString().replaceAll(',', '/');

    return this.dynamicRoutes.map(p=>p.route).includes(routerUrl);
  }

  get isCurrentRouteChild() {
    const routerUrl = this.routerUrlArray;
    return routerUrl.length > 1;
  }

  onReturn() {
    this.routeHistory.navigateBack();
  }

  openInputModal() {
    const currentDynamicRoute = this.dynamicRoutes.find(p => p.route === this.router.url);

    if (!currentDynamicRoute)
      return;

    const currentDynamicRouteKey = currentDynamicRoute.key;

    const submitInputModal = (form: any) => {
      const pageTitles = GlobalVariables.companyUserConfig?.pageTitles
      if (pageTitles)
        pageTitles[currentDynamicRouteKey] = form.value[currentDynamicRouteKey];
      else
        GlobalVariables.companyUserConfig!.pageTitles = form.value;

      const API_CALL = this.userService.updateUserConfig(GlobalVariables.companyUserConfig);

      API_CALL.subscribe();

      this.InputModalService.closeModal();
    }

    const modalOptions: ModalOptions = {
      title: 'Alterar título',
      formInputContent: {
        formInputs: [
          {
            id: currentDynamicRouteKey,
            label: 'Título da página',
            value: this.currentRoute,
            type: 'text',
            options: {
              maxLength: 18
            }
          }
        ],
        submit: submitInputModal
      }
    }

    this.InputModalService.openModal(modalOptions);
  }

}
