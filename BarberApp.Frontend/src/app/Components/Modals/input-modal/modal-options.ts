import { NgForm } from "@angular/forms";
import { IFormInput } from "../../FormInput/IFormInput";
import { EventEmitter } from "@angular/core";

export interface ModalOptions {
  title: string;
  formInputContent?: {
    formInputs: IFormInput[],
    submit: (form: NgForm) => any;
  };
  objects?: {
    title: string,
    value: string
  }[];
}
