import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from './Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { TokenStorageService } from './Services/auth/token-storage.service';
import { SpinnerService } from './Components/Spinner/spinner.service';
import { LoadAppService } from './Services/api/LoadApp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Barber-App';

  get isAuthPage() {
    const url = this.route.url;
    return url.includes('Login') || url.includes('Register');
  }

  get isAppLoaded(){
    return GlobalVariables.isAppLoaded;
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private loadAppService: LoadAppService,
    private route: Router,
    public spinnerService: SpinnerService,
    public toastrService: ToastrService,
  ) {
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

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
