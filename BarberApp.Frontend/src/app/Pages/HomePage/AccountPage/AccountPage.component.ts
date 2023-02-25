import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { AuthService } from './../../../Services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../../Services/token-storage.service';
import { UserModel } from '../../../Models/UserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AccountPage',
  templateUrl: './AccountPage.component.html',
  styleUrls: ['./AccountPage.component.scss']
})
export class AccountPageComponent implements OnInit {

  get userInfo() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');
  }

  onSubmit(form: NgForm) {

    const userModel = new UserModel(form.value);

    const apiCall = this.isAdmin ? this.authService.update(userModel) : this.authService.updateBarber(userModel);

    apiCall.subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false, true, true);
        this.tokenStorage.saveUser(data.data);
        this.router.navigateByUrl('/Home');
      },
      error: (err) => {
        LoaderComponent.SetOptions(false, false, true);
        console.log(err);
      }
    })

  }

  onCancel() {
    this.router.navigateByUrl('/Home');
  }

  removeUndefinedStrings(value: any) {
    return value == 'Não definido' ? '' : value;
  }

}
