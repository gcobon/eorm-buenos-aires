import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models';
import { environment } from './../../../environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private http: HttpClient) {}

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${url_base}/profesores/listar`);
  }

  getOneProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${url_base}/profesores/buscar/${id}`);
  }

  saveProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${url_base}/profesores/crear`, professor);
  }

  updateProfessor(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(
      `${url_base}/profesores/actualizar/${professor.id}`,
      professor
    );
  }

  deleteProfessor(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/profesores/eliminar/${id}`);
  }
}
