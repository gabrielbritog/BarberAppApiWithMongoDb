/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouteHistoryService } from './route-history.service';

describe('Service: RouteHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteHistoryService]
    });
  });

  it('should ...', inject([RouteHistoryService], (service: RouteHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
