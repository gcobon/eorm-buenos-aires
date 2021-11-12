import { User } from ".";
import { Classroom } from "./classroom";
import { Grade } from "./grade";
import { Responsable } from "./responsable";

export class Students {

    constructor(
        public codigo_personal:string,
        public primer_nombre_estudiante:string,
        public segundo_nombre_estudiante:string,
        public primer_apellido_estudiante:string,
        public segundo_apellido_estudiante:string,
        public fecha_nacimiento:string,
        public edad_estudiante:number,
        public sexo_estudiante:string,
        public idioma_estudiante:string,
        public lateralidad_estudiante:string,
        public direccion_estudiante:string,
        public observacion:string,
        public usuario:User,
        public responsable:Responsable,
        public grado:Grade,
        public aula:Classroom,

    ){}




}
