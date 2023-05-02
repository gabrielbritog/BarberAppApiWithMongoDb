/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientService } from './Client.service';

describe('Service: Client', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientService]
    });
  });

  it('should ...', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));
});
