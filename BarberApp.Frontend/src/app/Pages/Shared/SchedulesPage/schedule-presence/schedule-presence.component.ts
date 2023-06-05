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
import * as moment from 'moment';

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
        if (this.schedule?.schedulingClass?.presenceList.find(p => p.clientId === a.clientId)?.presence)
          return -1;
        if (this.schedule?.schedulingClass?.presenceList.find(p => p.clientId === b.clientId)?.presence)
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

          if (!existedSchedule || !existedSchedule.schedulingClass) {
            this.router.navigateByUrl('/Schedules');
            return;
          }

          this.schedule = existedSchedule;

          const existedClass = GlobalVariables.allClasses.find(p=> p.id === existedSchedule.schedulingClass?.classId)

          this.classModel = ClassesUtilities.convertApiModelToFrontModel(existedClass!);
        }
      )
  }

  clientsTable() {
    const table: DefaultTable = {
      titles: ['Aluno', ''],
      objects: [],
      onClick: (event: any) => this.addClientEventToClass(event)
    }

    const scheduleMoment = moment(this.schedule?.schedulingDate);
    const momentDiff = moment().diff(scheduleMoment);

    const listClients = momentDiff < 0 ? this.classModel.clientsModel : this.schedule?.schedulingClass?.presenceList.map(p => {
      return GlobalVariables.clients.find(b=> b.clientId === p.clientId)!
    })

    if(listClients)
      listClients.forEach(client => {
        table.objects.push({
          object: {
            name: client.name,
            // registerNumber: client.registerNumber,
            checkbox: this.hasClientId(client.clientId),
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

  hasClientId(clientId?: string) {
    if (!clientId)
      return false;

    return this.schedule!.schedulingClass!.presenceList.some(p=> p.clientId === clientId && p.presence);
  }

  addClientIdToClass(clientId: string) {

    const client = this.schedule?.schedulingClass?.presenceList.find(p => p.clientId === clientId)!;

    client.presence = !client.presence;
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
