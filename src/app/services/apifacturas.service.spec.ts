import { TestBed } from '@angular/core/testing';

import { ApifacturasService } from './apifacturas.service';

describe('ApifacturasService', () => {
  let service: ApifacturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApifacturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
