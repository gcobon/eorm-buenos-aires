import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Responsable } from '../models/responsable';


const url_base = environment.url_base;


@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http: HttpClient) { }

  getResponsable(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${url_base}/responsables/listar`);
  }

  getOneResponsable(id_responsable: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${url_base}/responsables/buscar/${id_responsable}`);
  }

  saveResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.post<Responsable>(`${url_base}/responsables/crear`, responsable);
  }

  updateResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.put<Responsable>(
      `${url_base}/responsables/actualizar/${responsable.id_responsable}`,
      responsable
    );
  }

 

  deleteResponsable(id_responsable: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/responsables/eliminar/${id_responsable}`);
  }



}
