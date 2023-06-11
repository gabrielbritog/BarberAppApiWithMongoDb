import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InputModalComponent } from './input-modal.component';
import { ModalOptions } from './modal-options';

@Injectable({
  providedIn: 'root'
})
export class InputModalService {
  modalRef?: BsModalRef;
  options: ModalOptions = {
    title: ''
  }

  constructor(private modalService: BsModalService) { }

  openModal(options?: ModalOptions) {
    if (options)
      this.options = options;

    this.modalRef = this.modalService.show(InputModalComponent);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
