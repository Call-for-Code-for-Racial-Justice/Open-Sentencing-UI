import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticatedUserGuard } from './authenticate-user.guard';

describe('AuthenticatedUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedUserGuard]
    });
  });

  it('should ...', inject([AuthenticatedUserGuard], (guard: AuthenticatedUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
