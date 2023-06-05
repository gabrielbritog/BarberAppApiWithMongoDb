import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel, ClientModelHelper } from 'src/app/Models/ClientModel';

@Component({
  selector: 'app-HistoryClient',
  templateUrl: './HistoryClient.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './HistoryClient.component.css']
})
export class HistoryClientComponent implements OnInit {

  id: string = '';
  subscription?: Subscription;

  clientModel: ClientModel = ClientModelHelper.create();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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

          this.clientModel = ClientModelHelper.clone(existedClientModel);
        }
      )
  }

  getAbsencesTable() {
    const absencesTable: DefaultTable = {
      titles: ['Turma', 'Data', 'Presença'],
      objects: [],
      onClick: (event: any) => this.goToScheduleDetails(event)
    }

    const classesWithClient = GlobalVariables.schedules
      .filter(p => p.schedulingClass && p.schedulingClass.presenceList.some(clP => clP.clientId === this.clientModel.clientId))
      .map(p => {
        return {
          date: p.date,
          time: p.time,
          datetime: moment(p.schedulingDate),
          className: GlobalVariables.allClasses.find(cl =>
            cl.id === p.schedulingClass?.classId)!.name,
          presence: p.schedulingClass?.presenceList.some(c=> c.clientId === this.clientModel.clientId && c.presence),
          scheduleId: p.schedulingId
        }
    });

    classesWithClient.forEach((classWithClient, i) => {
      absencesTable.objects.push({
        object: {
          className: classWithClient.className,
          date: classWithClient.datetime.utc().format('DD/MM/YYYY, HH:mm'),
          presence: classWithClient.presence? 'Presente' : 'Falta',
          id: classWithClient.scheduleId
        }
      })
    })

    return absencesTable;
  }

  goToScheduleDetails(event: any) {
    if (!event.object.id)
      return;

    GlobalVariables.modalAsEdit = true;
    GlobalVariables.editSchedule = GlobalVariables.schedules.find(p=>p.schedulingId === event.object.id);

    this.router.navigateByUrl(`/Schedules/Details`);
  }

}
