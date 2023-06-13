import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private ngZone: NgZone) {}

  public show(): void {
    this.activeRequests++;
    this.ngZone.runOutsideAngular(() => {
      this.isLoadingSubject.next(true);
    });
  }

  public hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.ngZone.runOutsideAngular(() => {
        this.isLoadingSubject.next(false);
        this.activeRequests = 0;
      });
  }
  }

}
