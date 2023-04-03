import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {}

  public show(): void {
    this.activeRequests++;
    this.isLoadingSubject.next(true);
  }

  public hide(): void {
    setTimeout(() => {

      this.activeRequests--;
      if (this.activeRequests <= 0) {
        this.isLoadingSubject.next(false);
        this.activeRequests = 0;
      }

    }, 20);
  }
}
