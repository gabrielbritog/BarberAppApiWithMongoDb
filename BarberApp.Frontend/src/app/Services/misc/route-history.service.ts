import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlusButtonService } from '../../Components/PlusButton/plus-button.service';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {
  private static historyRoutes: string[] = [];
  private static previousUrl?: string;
  private static currentUrl?: string;

  constructor(
    private router: Router,
    private plusButtonService: PlusButtonService
  ) {
    if (this.getHistory().length !== 0)
      return;

    RouteHistoryService.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        if (this.router.url.includes('New') && GlobalVariables.userLevel > environment.userLevel.manager) {
          this.router.navigateByUrl('/Home');
          return;
        }

        if (event.url != RouteHistoryService.previousUrl){
          RouteHistoryService.previousUrl = RouteHistoryService.currentUrl;
          RouteHistoryService.historyRoutes.push(RouteHistoryService.previousUrl!);
        }
        RouteHistoryService.currentUrl = event.url;
        this.isRouteWithPlusButton();
      };
    });
  }

  isRouteWithPlusButton() {
    const routesWithPlusButton = [
      '/Employees',
      '/Services',
      '/Classes',
      '/Clients',
      '/Schedules',
    ];

    const currentRouteNeedPlusButton = routesWithPlusButton.some(route => route == this.router.url);

    if (currentRouteNeedPlusButton)
      this.plusButtonService.show();
    else
      this.plusButtonService.hide();
  }

  clearHistory() {
    RouteHistoryService.historyRoutes = [];
  }

  getHistory() {
    return RouteHistoryService.historyRoutes;
  }

  getPreviousUrl() {
    return RouteHistoryService.previousUrl;
  }

  getLastHistoryUrl() {
    const history = RouteHistoryService.historyRoutes;
    if (history.length > 1)
      return history[history.length - 1];

    const urlSplitted = this.router.url.split('/', 2).toString().replaceAll(',', '/');
    return urlSplitted;
  }

  navigateBack() {
    this.router.navigateByUrl(this.getLastHistoryUrl());
    RouteHistoryService.historyRoutes.pop();
  }

}
