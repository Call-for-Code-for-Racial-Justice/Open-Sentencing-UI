import { TestBed } from '@angular/core/testing';

import { ModalFormService } from './modal-form.service';

describe('ModalFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalFormService = TestBed.get(ModalFormService);
    expect(service).toBeTruthy();
  });
});
