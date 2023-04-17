import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { ClientModel } from '../../../../Models/ClientModel';
import { ClassesModel } from '../../../../Models/ClassesModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ClassDetails',
  templateUrl: './ClassDetails.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './ClassDetails.component.css']
})
export class ClassDetailsComponent implements OnInit {
  classModel: ClassesModel;
  get selectedClass() {
    return GlobalVariables.selectedClass;
  }
  set selectedClass(value) {
    GlobalVariables.selectedClass = value;
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  searchValue = '';

  get clientList() {
    return GlobalVariables.schedules
    .map(p => p.client)
    .filter(p =>
      p.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      p.phone.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .filter((cName, index, self) => self.map(p => p.phone).includes(cName.phone, index + 1) === false)
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((b, a) => {
        if (this.classModel.clients.some(p => p == a))
          return 1;
        if (this.classModel.clients.some(p => p == b))
          return -1;

        return 0
      });

  }

  hasClient(client: ClientModel) {
    return this.classModel.clients.some(p => p == client);
  }

  addClientToClass(client: ClientModel) {
    if (this.classModel.clients.some(p => p == client))
      this.classModel.clients = this.classModel.clients.filter(p=> p !== client);
    else
      this.classModel.clients.push(client);
  }

  constructor(private router: Router) {
    if (!this.selectedClass){
      this.classModel = {
        name: 'Teste',
        clients: [],
        presence: []
      }
    }
    else {
      this.classModel = {
        name: this.selectedClass.name,
        clients: this.selectedClass.clients,
        presence: this.selectedClass.presence
      }
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.selectedClass === undefined) {
      this.classModel.id = 1;
      this.classModel.id += GlobalVariables.allClasses.length > 0 ?
          GlobalVariables.allClasses
          .filter(p => p.id != undefined && p.id >= 0)
          .map(p => p.id!)
          .sort()
          .reverse()[0] : 0;
      GlobalVariables.allClasses.push({
        id: this.classModel.id,
        name: this.classModel.name,
        clients: [...this.classModel.clients],
        presence: [...this.classModel.presence],
      });
      console.log(GlobalVariables.allClasses, this.classModel.id);
      this.router.navigateByUrl('/Classes');
      return;
    }


    const existedClass = GlobalVariables.allClasses.find(p => p.id === this.selectedClass!.id?? -1);

    if (existedClass) {
      existedClass.name = this.classModel.name;
      existedClass.clients = [...this.classModel.clients];
      existedClass.presence = [...this.classModel.presence];
    }

    console.log(GlobalVariables.allClasses);
    this.router.navigateByUrl('/Classes');
  }

}
