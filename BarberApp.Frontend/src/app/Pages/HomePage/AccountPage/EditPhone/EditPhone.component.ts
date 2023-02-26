import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from '../../../../Services/User.service';

@Component({
  selector: 'app-EditPhone',
  templateUrl: './EditPhone.component.html',
  styleUrls: ['../AccountPage.component.scss','./EditPhone.component.css']
})
export class EditPhoneComponent implements OnInit {

  phoneInput: IFormInput = {
    id: 'phoneNumber',
    label: 'Celular',
    type: 'text',
    value: this.getNumbersInsideString(this.tokenStorage.getUserModel().phoneNumber).toString()
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getNumbersInsideString(storedString: string) {
    const numbersFound = storedString.match(/\d+/g);
    return numbersFound?? '';
  }

  onSubmit(form: NgForm) {
    const API_CALL = this.userService.updatePhone(form.value);

    API_CALL.subscribe({
      next: (data: any) => {
        console.log(data);
        LoaderComponent.SetOptions(false, true, true);
        this.tokenStorage.saveUser(data.data);
        setTimeout(() => {
          this.router.navigateByUrl('/Account')
        }, LoaderComponent.timeoutOffset);
      },
      error: (err: any) => {
        console.log(err);
        LoaderComponent.SetOptions(false, false, true);
      }
    })
  }

}
