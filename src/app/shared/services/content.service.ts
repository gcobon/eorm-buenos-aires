import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Content } from '../models/content';
import Swal from 'sweetalert2';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getContent(): Observable<Content[]> {
    return this.http.get<Content[]>(`${url_base}/contenidos/listar`);
  }
  getOneContent(id: number): Observable<Content> {
    return this.http.get<Content>(`${url_base}/contenidos/buscar/${id}`);
  }

  async saveContent(archivo: File, idClase: string, nombreContenido: string) {
    try {
      const url = `${url_base}/contenidos/upload`;

      const headers = new Headers();
      headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
      headers.append('Content-Type', `multipart/form-data`);
      headers.append('Content-Disposition', `form-data`);
      headers.append('Accept', `*/*`);

      const formData = new FormData();

      formData.append('file', archivo);
      formData.append('id_clase', idClase);
      formData.append('nombre_contenido', nombreContenido);

      console.log({ archivo, idClase, nombreContenido });

      const resp = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData,
        mode: 'no-cors',
      });

      const res = await resp.json();

      console.log(res);

      Swal.fire({
        title: 'Correcto',
        text: 'Contenido subido correctamente',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: 'Error',
        text: 'Algo salió mal',
        icon: 'error',
      });
    }
  }

  updateContent(content: Content): Observable<Content> {
    return this.http.put<Content>(
      `${url_base}/contenidos/actualizar/${content.id}`,
      content
    );
  }

  deleteContent(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/contenidos/eliminar/${id}`);
  }
}
