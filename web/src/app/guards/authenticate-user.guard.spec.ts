import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthenticateUserGuard } from './authenticate-user.guard';

describe('AuthenticateUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateUserGuard]
    });
  });

  it('should ...', inject([AuthenticateUserGuard], (guard: AuthenticateUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
