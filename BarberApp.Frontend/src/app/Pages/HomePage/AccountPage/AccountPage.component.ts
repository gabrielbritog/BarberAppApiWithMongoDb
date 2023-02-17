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
    return this.tokenStorageService.getUserModel();
  }

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.expanded = false;
  }

  onCancel() {
    this.expanded = false;
  }

  removeUndefinedStrings(value: any) {
    return value == 'Não definido' ? '' : value;
  }

}
