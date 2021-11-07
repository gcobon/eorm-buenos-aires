import { Grade } from './grade';

export class Classroom {
  constructor(
    public nombre_aula: String,
    public seccion_aula: String,
    public grado: Grade,
    public capacidad_aula?: number,
    public id_aula?: number
  ) {}
}
