import { TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { tokenGetter } from "../app.module";

import { AuthenticatedUserGuard } from "./authenticate-user.guard";

describe("AuthenticatedUserGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter,
          },
        }),
      ],
      providers: [AuthenticatedUserGuard, JwtHelperService],
    });
  });

  it("should ...", inject(
    [AuthenticatedUserGuard],
    (guard: AuthenticatedUserGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
