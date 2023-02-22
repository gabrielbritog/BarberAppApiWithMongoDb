/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarberService } from './Barber.service';

describe('Service: Barber', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarberService]
    });
  });

  it('should ...', inject([BarberService], (service: BarberService) => {
    expect(service).toBeTruthy();
  }));
});
