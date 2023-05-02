import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariables } from './Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { EmployeeService } from './Services/api/Employee.service';
import { SchedulingService } from './Services/api/SchedulingService.service';
import { ServiceTypeService } from './Services/api/ServiceType.service';
import { TokenStorageService } from './Services/auth/token-storage.service';
import { WindowScrollDetectorDirective } from './Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { SpinnerService } from './Components/Spinner/spinner.service';
import { LoadAppService } from './Services/api/LoadApp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }
  title = 'Barber-App';

  get isAuthPage() {
    const url = this.route.url;
    return url.includes('Login') || url.includes('Register');
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private loadAppService: LoadAppService,
    private route: Router,
    public spinnerService: SpinnerService,
    public toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken() && !this.isAuthPage) {
      this.route.navigateByUrl('/Login');
      return;
    }

    if (this.tokenStorageService.isTokenExpirated()) {
      this.toastrService.warning('Sessão expirada');
      this.logout();
      return;
    }

    GlobalVariables.init(this.loadAppService);
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
