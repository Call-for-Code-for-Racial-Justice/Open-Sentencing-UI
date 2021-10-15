import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EmbraceService } from './embrace.service';

describe('EmbraceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: EmbraceService = TestBed.get(EmbraceService);
    expect(service).toBeTruthy();
  });
});
