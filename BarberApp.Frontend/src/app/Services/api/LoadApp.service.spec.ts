/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadAppService } from './LoadApp.service';

describe('Service: LoadApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadAppService]
    });
  });

  it('should ...', inject([LoadAppService], (service: LoadAppService) => {
    expect(service).toBeTruthy();
  }));
});
