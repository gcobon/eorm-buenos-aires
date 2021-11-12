import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Enrollment } from '../models/enrollment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  getEnrollment(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${url_base}/matriculas/listar`);
  }

  //grado como fk
  // getGrade(): Observable<Grade[]> {
  //  return this.http.get<Grade[]>(`${url_base}/aulas/grados`);
  //}

  getOneEnrollment(id_matricula: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${url_base}/matriculas/buscar/${id_matricula}`);
  }

  saveEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${url_base}/matriculas/crear`, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(
      `${url_base}/matriculas/actualizar/${enrollment.id_matricula}`,
      enrollment
    );
  }

  deleteEnrollment(id_matricula: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/matriculas/eliminar/${id_matricula}`);
  }

}
