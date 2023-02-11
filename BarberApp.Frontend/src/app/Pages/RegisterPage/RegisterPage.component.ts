import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-RegisterPage',
  templateUrl: './RegisterPage.component.html',
  styleUrls: ['./RegisterPage.component.scss']
})
export class RegisterPageComponent implements OnInit {

  submited = false;
  myForm: NgForm | undefined;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submited = true;
  }

  showPassword(elementId: string) {
    var element = document.getElementById(elementId) as HTMLInputElement;
    if (element.type == 'password')
      element.type = 'text';
    else
      element.type = 'password';
  }

  isShowPassword(elementId: string) {
    var element = document.getElementById(elementId) as HTMLInputElement;
    if (element.type == 'password')
      return false;

    return true;
  }

  isControlValid(elementId: string, basePasswordElement?: string) {
    var element = document.getElementById(elementId) as HTMLInputElement;
    var elementBase = true

    if (basePasswordElement)
      elementBase =
        element.value == (document.getElementById(basePasswordElement) as HTMLInputElement).value;

    if (!this.submited)
      return true;

    return (element.validity.valid && elementBase && element.value != "");
  }
}
