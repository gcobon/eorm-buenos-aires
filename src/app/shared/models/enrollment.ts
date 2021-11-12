import { Students } from "./students";

export class Enrollment {

    constructor(

    public id_matricula:number,
    public fecha_matricula:string,
    public observaciones:string,
    public estudiante:Students,



    ){}
}
