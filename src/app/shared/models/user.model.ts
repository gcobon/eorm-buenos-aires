import { Role } from './role.interface';

export class User {
  constructor(
    public nombre: string,
    public nombreUsuario: string,
    public email: string,
    public roles: Role[],
    public contraseña_usuario?: string,
    public id?: number
  ) {}
}
