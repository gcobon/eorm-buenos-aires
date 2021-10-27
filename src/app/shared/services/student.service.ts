import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get<any>(`${url_base}/estudiantes/listar`);
  }

  getOneStudent(id: number): Observable<any> {
    return this.http.get<any>(`${url_base}/estudiantes/buscar/${id}`);
  }

  saveStudent(data: any): Observable<any> {
    return this.http.post<any>(`${url_base}/estudiantes/crear`, data);
  }

  updateStudent(data: any): Observable<any> {
    return this.http.put<any>(`${url_base}/estudiantes/actualizar`, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/estudiantes/eliminar/${id}`);
  }
}
