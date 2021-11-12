import { User } from ".";

export class Professor {
  constructor(
    public id?: number,
    public primer_nombre_profesor?: string,
    public segundo_nombre_profesor?: string,
    public primer_apellido_profesor?: string,
    public segundo_apellido_profesor?: string,
    public dpi_profesor?: number,
    public fecha_nacimiento_profesor?: string,
    public edad_profesor?: number,
    public sexo_profesor?: string,
    public direccion_profesor?: string,
    public telefono_profesor?: string,
    public email_profesor?: string,
    public usuario?:User
  ) {}
}
