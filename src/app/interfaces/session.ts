import { User } from "./user";

export interface Session {
  token: string;
  user: User;
  expires_in: string;
}
