import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormInput } from './IFormInput';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-FormInput',
  templateUrl: './FormInput.component.html',
  styleUrls: ['./FormInput.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() inputs: IFormInput[] = [];
  @Output() submitAction = new EventEmitter<NgForm>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submitAction.emit(form);
  }

}
