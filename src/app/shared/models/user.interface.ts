export interface User {
  id?: number;
  enabled?: number;
  nombre_usuario?: string;
  contraseña_usuario?: string;
  roles?: Rol[] | string;
}

export interface Rol {
  id: number;
  nombre_rol: string;

}
