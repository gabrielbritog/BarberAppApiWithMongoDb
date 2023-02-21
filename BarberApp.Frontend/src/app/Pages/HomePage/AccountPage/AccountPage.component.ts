import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { AuthService } from './../../../Services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../../Services/token-storage.service';
import { UserModel } from '../../../Models/UserModel';

@Component({
  selector: 'app-AccountPage',
  templateUrl: './AccountPage.component.html',
  styleUrls: ['./AccountPage.component.scss']
})
export class AccountPageComponent implements OnInit {

  get expanded() {
    return GlobalVariables.accountExpanded;
  }

  set expanded(value) {
    GlobalVariables.accountExpanded = value;
  }

  get userInfo() {
    return this.tokenStorage.getUserModel();
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    let userModel = new UserModel(form.value);
    console.log(form, userModel);

    this.authService.update(userModel).subscribe({
      next: (data: any) => {
        LoaderComponent.SetOptions(false);
        console.log(data);
        // this.tokenStorage.saveUser(data.data.dados);
        this.expanded = false;
      },
      error: (err) => {
        LoaderComponent.SetOptions(false);
        console.log(err);
      }
    })

  }

  onCancel() {
    this.expanded = false;
  }

  removeUndefinedStrings(value: any) {
    return value == 'Não definido' ? '' : value;
  }

}
