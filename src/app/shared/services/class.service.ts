import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Class } from '../models/class';

const url_base = environment.url_base;


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  getClass(): Observable<Class[]> {
    return this.http.get<Class[]>(`${url_base}/clases/listar`);
  }

  getOneClass(id: number): Observable<Class> {
    return this.http.get<Class>(`${url_base}/clases/buscar/${id}`);
  }

  saveClass(classs: Class): Observable<Class> {
    return this.http.post<Class>(`${url_base}/clases/crear`, classs);
  }

  updateClass(classs: Class): Observable<Class> {
    return this.http.put<Class>(
      `${url_base}/clases/actualizar/${classs.id}`,
      classs
    );
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/clases/eliminar/${id}`);
  }









}
