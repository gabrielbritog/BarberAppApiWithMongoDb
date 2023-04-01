import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Loader',
  templateUrl: './Loader.component.html',
  styleUrls: ['./Loader.component.scss']
})
export class LoaderComponent implements OnInit {

  static readonly timeout = 2000;
  static readonly timeoutOffset = 2500;
  private static show = false;
  private static isSuccess = false;
  private static showSuccess = false;
  private static isRunning = false;


  get showLoader() {
    return LoaderComponent.show;
  }

  get success() {
    return LoaderComponent.isSuccess;
  }
  set success(value) {
    LoaderComponent.isSuccess = value;
  }

  get showSuccess() {
    return LoaderComponent.showSuccess;
  }

  constructor() { }

  ngOnInit() {
  }

  static SetOptions(show: boolean, isSuccess: boolean = false, showSuccess: boolean = false, _needTimeOut: boolean = true) {

    if (LoaderComponent.isRunning == true && show == true)
      return;

    let needTimeOut = (show == false && showSuccess) || _needTimeOut == true;
    LoaderComponent.showSuccess = false;


    LoaderComponent.isSuccess = isSuccess;

    LoaderComponent.isRunning = true;
    setTimeout(() => {

      LoaderComponent.showSuccess = showSuccess;

      setTimeout(() => {
        LoaderComponent.show = show;
        LoaderComponent.isRunning = false;
      }, needTimeOut? LoaderComponent.timeout / 2 : 0);

    }, needTimeOut ? LoaderComponent.timeout : 0);
  }

}
