import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';

@Component({
  selector: 'app-ClassesList',
  templateUrl: './ClassesList.component.html',
  styleUrls: ['./ClassesList.component.css']
})
export class ClassesListComponent implements OnInit {
  get AllClasses(){
    return GlobalVariables.allClasses;
  }

  get classesTable() {
    const _tables: DefaultTable = {
      titles: ['Nome', 'Alunos'],
      objects: [],
      onClick: (event: any) => this.editClass(event)
    }

    GlobalVariables.allClasses
      // .filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId)
      .forEach((classModel, i) => {
        _tables.objects.push({
          object: {
            name: classModel.name,
            amount: classModel.clientsId.length,
            id: classModel.id
          },
          // fontawesomeIcon: "fa-solid fa-pen",
          // imgUrl: client.urlImage,
          // iconBgColor: AppColors.main
        })
      })

    return _tables;
  }

  editClass(event: any) {
    if (!event.object.id)
      return;

    const classModel = GlobalVariables.allClasses.find(p => p.id === event.object.id);
    if (!classModel)
      return;

    GlobalVariables.selectedClass = classModel;
    this.router.navigateByUrl('/Classes/Details')
  }

  constructor(private router: Router) { }

  ngOnInit() {
    GlobalVariables.selectedClass = undefined;
  }

  newClass() {
    this.router.navigateByUrl('/Classes/Details');
  }

}
