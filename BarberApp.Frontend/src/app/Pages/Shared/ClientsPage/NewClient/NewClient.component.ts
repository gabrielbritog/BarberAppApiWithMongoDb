import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ServiceTypeModel } from 'src/app/Models/ServiceTypeModel';
import { ClientService } from '../../../../Services/api/Client.service';
import { ClientModel, ClientModelHelper } from '../../../../Models/ClientModel';

@Component({
  selector: 'app-NewClient',
  templateUrl: './NewClient.component.html',
  styleUrls: ['./NewClient.component.css']
})
export class NewClientComponent implements OnInit {

  modalInputs: IFormInput[] = [
    {
      id: 'name',
      label: 'Nome',
      type: 'text',
      value: ''
    },
    {
      id: 'phone',
      label: 'Contato',
      type: 'text',
      value: '',
    },
  ]

  constructor(
    private clientsService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.invalid)
      return;

    let clientModel: ClientModel = ClientModelHelper.clone(form.value);

    let newClientId = 0;

    do {
      newClientId++;
    } while (GlobalVariables.clients.some(p => p.clientId == newClientId.toString()));
    clientModel.clientId = newClientId.toString();

    const apiCall = this.clientsService.register(clientModel);

    apiCall.subscribe({
      next: (data: any) => {
        console.log(data.message)
        setTimeout(() => {
          GlobalVariables.clients.push(data.data);

          this.onCancel();
          form.resetForm();
        }, 20);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCancel() {
    this.router.navigateByUrl('/Clients');
  }

}
