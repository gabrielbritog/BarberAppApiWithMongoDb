import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-FormInput',
  templateUrl: './FormInput.component.html',
  styleUrls: ['./FormInput.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() label?: string;
  @Input() inputValue: string = '';
  @Input() type: string = 'text';

  constructor() { }

  ngOnInit() {
  }

}
