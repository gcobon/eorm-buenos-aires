import { User } from '.';

export interface Professor {
  id?: number;
  primer_nombre_profesor?: string;
  segundo_nombre_profesor?: string;
  primer_apellido_profesor?: string;
  segundo_apellido_profesor?: string;
  dpi_profesor?: number;
  fecha_nacimiento_profesor?: string;
  edad_profesor?: number;
  sexo_profesor?: string;
  direccion_profesor?: string;
  telefono_profesor?: string;
  email_profesor?: string;
  usuario?: User;
}
