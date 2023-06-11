import { Component } from '@angular/core';
import { InputModalService } from './input-modal.service';
import { IFormInput } from '../../FormInput/IFormInput';
import { ModalOptions } from './modal-options';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent {

  options: ModalOptions;

  constructor(private inputModalService: InputModalService) {
    this.options = inputModalService.options;
  }

  onSubmit(event: any) {
    this.options.formInputContent?.submit(event)
  }

  closeModal() {
    this.inputModalService.closeModal()
  }
}
