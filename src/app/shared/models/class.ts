import { Professor } from ".";
import { Classroom } from "./classroom";
import { Course } from "./course";

export class Class {

  constructor(
    public id:number,
    public descripcion: string,
    public profesor: Professor,
    public curso: Course,
    public aula: Classroom
    
  ) {}
}

