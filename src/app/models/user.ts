import {Role} from './enums/role.enum';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  key: string;
  role: Role;
}
