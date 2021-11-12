import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Scors } from '../models/scors';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ScorsService {

  constructor(private http: HttpClient) { }

  getScors(): Observable<Scors[]> {
    return this.http.get<Scors[]>(`${url_base}/calificaciones/listar`);
  }

  getOneScors(id: number): Observable<Scors> {
    return this.http.get<Scors>(`${url_base}/calificaciones/buscar/${id}`);
  }

  saveScors(scorss: Scors): Observable<Scors> {
    return this.http.post<Scors>(`${url_base}/calificaciones/crear`, scorss);
  }

  updateScors(scorss: Scors): Observable<Scors> {
    return this.http.put<Scors>(`${url_base}/calificaciones/actualizar/${scorss.id}`,
      scorss
    );
  }

  deleteScors(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/calificaciones/eliminar/${id}`);
  }







}
