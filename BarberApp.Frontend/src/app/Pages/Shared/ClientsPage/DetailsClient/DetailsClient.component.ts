import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormInput } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel, ClientModelHelper } from 'src/app/Models/ClientModel';
import { ClientService } from 'src/app/Services/api/Client.service';

@Component({
  selector: 'app-DetailsClient',
  templateUrl: './DetailsClient.component.html',
  styleUrls: ['./DetailsClient.component.css']
})
export class DetailsClientComponent implements OnInit, OnDestroy {

  id: string = '';
  subscription?: Subscription;

  clientModel?: ClientModel;

  modalInputs: IFormInput[] = [
    {
      id: 'name',
      label: 'Nome',
      type: 'text',
      value: this.clientModel?.name
    },
    {
      id: 'phone',
      label: 'Contato',
      type: 'text',
      value: this.clientModel?.phone,
    },
  ]
  constructor(
    private clientsService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {  }

  ngOnInit() {
    if (!this.activatedRoute.snapshot.params['id']){
      this.router.navigateByUrl('/Clients');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['id']){
            this.router.navigateByUrl('/Clients');
            return;
          }

          this.id = params['id'];

          const existedClientModel = GlobalVariables.clients.find(client => client.clientId === this.id);

          if (!existedClientModel) {
            this.router.navigateByUrl('/Clients');
            return;
          }

          this.clientModel = existedClientModel;

          this.modalInputs = [
            {
              id: 'name',
              label: 'Nome',
              type: 'text',
              value: this.clientModel?.name
            },
            {
              id: 'phone',
              label: 'Contato',
              type: 'text',
              value: this.clientModel?.phone,
            },
          ]
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onSubmit(form: NgForm) {

    if (form.invalid)
      return;

    let clientModel: ClientModel = ClientModelHelper.clone(form.value);

    const apiCall = this.clientsService.update(clientModel);

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
