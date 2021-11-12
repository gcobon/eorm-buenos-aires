import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Students } from '../models/students';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get<any>(`${url_base}/estudiantes/listar`);
  }

  getOneStudent(codigo_personal: string): Observable<any> {
    return this.http.get<any>(`${url_base}/estudiantes/buscar/${codigo_personal}`);
  }

  saveStudent(data: any): Observable<any> {
    return this.http.post<any>(`${url_base}/estudiantes/crear`, data);
  }

  updateStudent(students: Students): Observable<Students> {
    return this.http.put<Students>(`${url_base}/estudiantes/actualizar/${students.codigo_personal}`,
      students
    );
  }

  deleteStudent(codigo_personal: string): Observable<any> {
    return this.http.delete<any>(`${url_base}/estudiantes/eliminar/${codigo_personal}`);
  }
}
