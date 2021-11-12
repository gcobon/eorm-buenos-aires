import { Course } from "./course";
import { Students } from "./students";

export class Scors {
constructor (

    public id:number,
	public nota_bim1:number,
	public nota_bim2:number,
	public nota_bim3:number,
	public nota_bim4:number,
	public promedio_final:number,
    public curso:Course,
    public estudiante:Students,


){}

}
