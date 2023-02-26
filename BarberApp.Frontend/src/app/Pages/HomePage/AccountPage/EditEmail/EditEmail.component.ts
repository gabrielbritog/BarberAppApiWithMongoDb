import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserConfig } from 'src/app/Models/UserConfig';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-EditEmail',
  templateUrl: './EditEmail.component.html',
  styleUrls: ['../AccountPage.component.scss','./EditEmail.component.css']
})
export class EditEmailComponent implements OnInit {

  emailInput: IFormInput = {
    id: 'email',
    label: 'Email',
    type: 'email',
    value: this.tokenStorage.getUserModel().email,
    alert: 'Você terá que logar novamente após alterar o email.'
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const API_CALL = this.userService.updateEmail(form.value);

    API_CALL.subscribe({
      next: (data: any) => {
        console.log(data);
        LoaderComponent.SetOptions(false, true, true);
        setTimeout(() => {
          this.tokenStorage.signOut();
          GlobalVariables.loadUserConfig(new UserConfig());
          this.router.navigateByUrl('/')
        }, LoaderComponent.timeoutOffset);
      },
      error: (err: any) => {
        console.log(err);
        LoaderComponent.SetOptions(false, false, true);
      }
    })
  }
}
