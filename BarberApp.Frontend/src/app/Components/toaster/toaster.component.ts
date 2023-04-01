import { Component, OnInit } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('active => removed', animate('400ms ease-in-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ToasterComponent extends Toast implements OnInit {
  ngOnInit(): void {
  }
}
