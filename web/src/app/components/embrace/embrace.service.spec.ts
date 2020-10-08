import { TestBed } from '@angular/core/testing';

import { EmbraceService } from './embrace.service';

describe('EmbraceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbraceService = TestBed.get(EmbraceService);
    expect(service).toBeTruthy();
  });
});
