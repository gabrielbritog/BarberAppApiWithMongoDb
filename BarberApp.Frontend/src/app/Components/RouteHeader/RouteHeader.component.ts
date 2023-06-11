import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteHistoryService } from '../../Services/misc/route-history.service';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { InputModalService } from '../Modals/input-modal/input-modal.service';
import { ModalOptions } from '../Modals/input-modal/modal-options';

@Component({
  selector: 'app-RouteHeader',
  templateUrl: './RouteHeader.component.html',
  styleUrls: ['./RouteHeader.component.css']
})
export class RouteHeaderComponent implements OnInit {
  @Input() showOn: 'mobile' | 'desktop' = 'mobile';
  @Input() margin: boolean = true;

  get isAdmin() {
    return this.tokenStorage.isAdmin();
  }

  constructor(
    private router: Router,
    private routeHistory: RouteHistoryService,
    private tokenStorage: TokenStorageService,
    private InputModalService: InputModalService,
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
      'Turmas',
      this.isAdmin? 'Editar Turma' : 'Detalhes da turma',
      'Nova turma',
      'Alunos',
      'Novo Aluno',
      this.isAdmin? 'Editar Aluno' : 'Detalhes',
      'Aulas',
      'Ficha de Avaliação',
      'Novo Aluno',
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

    const dynamicRoutes: string[] = [
      '/Classes',
      '/Clients',
    ]

    return dynamicRoutes.includes(routerUrl);
  }

  get isCurrentRouteChild() {
    const routerUrl = this.routerUrlArray;
    return routerUrl.length > 1;
  }

  onReturn() {
    this.routeHistory.navigateBack();
  }

  openInputModal() {

    const submitInputModal = (form: any) => {
      console.log(form.value);
      this.InputModalService.closeModal();
    }

    const modalOptions: ModalOptions = {
      title: 'Alterar título',
      formInputContent: {
        formInputs: [
          {
            id: 'pageTitle',
            label: 'Título da página',
            value: this.currentRoute,
            type: 'text'
          }
        ],
        submit: submitInputModal
      }
    }

    this.InputModalService.openModal(modalOptions);
  }

}
