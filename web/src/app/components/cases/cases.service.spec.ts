import { TestBed } from '@angular/core/testing';

import { CaseService } from './cases.service';

describe('EmbraceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseService = TestBed.get(CaseService);
    expect(service).toBeTruthy();
  });
});
