import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Grade } from '../models/grade';
import { environment } from './../../../environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

getGrade(): Observable<Grade[]> {

return this.http.get<Grade[]>(`${url_base}/grados/listar`);

}

getOneGrade(id_grado:number): Observable<Grade> {

  return this.http.get<Grade>(`${url_base}/grados/buscar/${id_grado}`);
  
  }


  saveGrade(grade:Grade):Observable<Grade>{

return this.http.post<Grade>(`${url_base}/grados/crear`, grade);


  }


  updateGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(
      `${url_base}/grados/actualizar/${grade.id_grado}`,
      grade
    );
  }


  deleteGrade(id_grado: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/grade/eliminar/${id_grado}`);
  }



}
