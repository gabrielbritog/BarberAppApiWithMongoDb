/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardService } from './Dashboard.service';

describe('Service: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
  });

  it('should ...', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
});
