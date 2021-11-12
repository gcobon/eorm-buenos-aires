import { TestBed } from '@angular/core/testing';

import { ScorsService } from './scors.service';

describe('ScorsService', () => {
  let service: ScorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
