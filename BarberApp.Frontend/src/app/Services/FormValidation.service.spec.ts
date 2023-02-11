/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormValidationService } from './FormValidation.service';

describe('Service: FormValidation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService]
    });
  });

  it('should ...', inject([FormValidationService], (service: FormValidationService) => {
    expect(service).toBeTruthy();
  }));
});
