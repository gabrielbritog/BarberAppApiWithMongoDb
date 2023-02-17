import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ConfirmationModal',
  templateUrl: './ConfirmationModal.component.html',
  styleUrls: ['./ConfirmationModal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  showModal = false;

  constructor() { }

  ngOnInit() {
  }

  onCancel() {

  }

  onConfirm() {

  }
}
