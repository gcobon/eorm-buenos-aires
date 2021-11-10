import { Class } from "./class";

export class Content {

    constructor (
    public id: number,
	public nombre_contenido: string,
	public fecha_creacion: string,
	public archivo: string,
    public clase:Class

    ){}
}
