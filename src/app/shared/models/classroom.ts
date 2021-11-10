import { Grade } from './grade';

export class Classroom {
  constructor(
    public nombre_aula: string,
    public seccion_aula: string,
    public grado: Grade,
    public capacidad_aula?: number,
    public id_aula?: number
  ) {}
}
