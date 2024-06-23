import { Rol } from "./rol";

export class Usuario {
    id: number = 0;
    username: string = '';
    password: string = '';
    enabled: boolean = true;
    roles: Rol[] = [];
  }
  