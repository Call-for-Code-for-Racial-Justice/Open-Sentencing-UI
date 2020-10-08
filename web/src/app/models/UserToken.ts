export interface UserToken {
  token: string;
  user?: {
    id?: string;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
  };
}
