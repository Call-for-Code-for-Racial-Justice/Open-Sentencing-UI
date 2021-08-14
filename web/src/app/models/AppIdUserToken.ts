export interface UserToken {
  token: string;
  expired: boolean;
  user?: {
    id?: string;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
  };
}
