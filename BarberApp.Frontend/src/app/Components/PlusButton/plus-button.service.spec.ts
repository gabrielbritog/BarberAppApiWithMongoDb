/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlusButtonService } from './plus-button.service';

describe('Service: PlusButton', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlusButtonService]
    });
  });

  it('should ...', inject([PlusButtonService], (service: PlusButtonService) => {
    expect(service).toBeTruthy();
  }));
});
