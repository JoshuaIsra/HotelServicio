import { TestBed } from '@angular/core/testing';

import { ApirerservasService } from './apirerservas.service';

describe('ApirerservasService', () => {
  let service: ApirerservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirerservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
