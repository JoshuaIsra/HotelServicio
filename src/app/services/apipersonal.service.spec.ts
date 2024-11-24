import { TestBed } from '@angular/core/testing';

import { ApipersonalService } from './apipersonal.service';

describe('ApipersonalService', () => {
  let service: ApipersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
