import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClassesFrontModel, ClassesUtilities } from 'src/app/Models/ClassesModel';
import { ClientModel } from 'src/app/Models/ClientModel';
import { ScheduleModel } from 'src/app/Models/ScheduleModel';
import { SchedulingService } from '../../../../Services/api/SchedulingService.service';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';

@Component({
  selector: 'app-schedule-presence',
  templateUrl: './schedule-presence.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './schedule-presence.component.css']
})
export class SchedulePresenceComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription?: Subscription;
  schedule?: ScheduleModel;
  classModel!: ClassesFrontModel;

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  searchValue = '';

  get clientList() {
    return this.classModel.clientsModel
      .filter(p=> p.name.toLowerCase().includes(this.searchValue))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => {
        if (this.classModel.clientsPresence.some(p => p.clientId === a.clientId))
          return -1;
        if (this.classModel.clientsPresence.some(p => p.clientId === b.clientId))
          return 1;

        return 0;
      })
  }

  constructor(
    private router: Router,
    private schedulingService: SchedulingService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if (!this.activatedRoute.snapshot.params['id']){
      this.router.navigateByUrl('/Schedules');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['id']){
            this.router.navigateByUrl('/Schedules');
            return;
          }

          this.id = params['id'];

          const existedSchedule = GlobalVariables.schedules.find(schedule => schedule.schedulingId === this.id);

          if (!existedSchedule || !existedSchedule.class) {
            this.router.navigateByUrl('/Schedules');
            return;
          }

          this.schedule = existedSchedule;

          this.classModel = ClassesUtilities.convertApiModelToFrontModel(existedSchedule.class);
        }
      )
  }

  clientsTable() {
    const table: DefaultTable = {
      titles: ['Aluno', ''],
      objects: [],
      onClick: (event: any) => this.addClientEventToClass(event)
    }

    this.classModel.clientsModel.forEach(client => {
      table.objects.push({
        object: {
          name: client.name,
          // registerNumber: client.registerNumber,
          checkbox: this.hasClient(client),
          onChange: (clientId: string) => this.addClientIdToClass(clientId),
          id: client.clientId,
        }
      })
    })

    return table;
  }

  hasClient(client: ClientModel) {
    if (!client.clientId)
      return false;

    return this.hasClientId(client.clientId);
  }

  hasClientId(clientId: string) {
    return this.classModel.clientsPresence.some(p => p.clientId == clientId);
  }

  addClientIdToClass(clientId: string) {
    const client = GlobalVariables.clients.find(p => p.clientId === clientId);

    if (!client)
      return;

    if (this.classModel.clientsPresence.some(p => p == client)){
      this.classModel.clientsPresence = this.classModel.clientsPresence.filter(p => p !== client);
    }
    else{
      this.classModel.clientsPresence.push(client);
    }
  }

  addClientToClass(client: ClientModel) {
    if (client.clientId)
      this.addClientIdToClass(client.clientId)
  }

  addClientEventToClass(event: any) {
    if (!event.object?.id)
      return;

    this.addClientIdToClass(event.object.id);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (!this.schedule)
      return;

    this.schedule.class = ClassesUtilities.convertFrontModelToApiModel(this.classModel);

    const apiCall = this.schedulingService.update(this.schedule);

    apiCall.subscribe({
      next: (value) => {
        this.successResponse(value);
      },
      error(err) {
        console.log(err)
      },
    })
  }

  successResponse(apiResponse: any) {
    const existedClass = GlobalVariables.schedules.findIndex(p => p.schedulingId === apiResponse.data.schedulingId)!;
    GlobalVariables.schedules[existedClass] = new ScheduleModel(apiResponse.data);

    this.router.navigateByUrl('/Schedules');
  }

  onCancel() {
    this.router.navigateByUrl('/Schedules/Details')
  }

}
