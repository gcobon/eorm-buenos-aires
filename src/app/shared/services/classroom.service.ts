import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';
import { environment } from './../../../environments/environment';
import { Grade } from '../models/grade';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }

  getClassroom(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${url_base}/aulas/listar`);
  }

  //grado como fk
 // getGrade(): Observable<Grade[]> {
  //  return this.http.get<Grade[]>(`${url_base}/aulas/grados`);
  //}

  getOneClassroom(id_aula: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${url_base}/aulas/buscar/${id_aula}`);
  }

  saveClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${url_base}/aulas/crear`, classroom);
  }

  updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(
      `${url_base}/aulas/actualizar/${classroom.id_aula}`,
      classroom
    );
  }

  deleteClassroom(id_aula: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/aulas/eliminar/${id_aula}`);
  }

}
