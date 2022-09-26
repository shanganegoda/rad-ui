import { TestBed } from '@angular/core/testing';

import { Appoinmentservice } from './appoinmentservice.service';

describe('AppoinmentserviceService', () => {
  let service: Appoinmentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Appoinmentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
