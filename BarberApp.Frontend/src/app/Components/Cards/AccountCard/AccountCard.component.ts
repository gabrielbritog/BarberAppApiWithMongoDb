import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-AccountCard',
  templateUrl: './AccountCard.component.html',
  styleUrls: ['./AccountCard.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() title?: string;
  @Input() content?: string;

  constructor() { }

  ngOnInit() {
  }

}
