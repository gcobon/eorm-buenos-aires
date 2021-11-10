import { Class } from './class';

export class Content {
  constructor(
    public nombre_contenido: string,
    public fecha_creacion: string,
    public clase: Class,
    public archivo: File,
    public id?: number
  ) {}
}
