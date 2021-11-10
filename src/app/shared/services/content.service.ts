import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Content } from '../models/content';

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

  // saveContent(content: Content): Observable<Content> {
  //   return this.http.post<Content>(`${url_base}/contenidos/upload`, content);
  // }

  async saveContent(content: Content) {
    // return this.http.post<Content>(`${url_base}/contenidos/upload`, content);

    try {
      const url = `${url_base}/contenidos/upload`;

      const formData = new FormData();

      formData.append('file', content.archivo);
      formData.append('id_clase', `${content.clase.id}`);
      formData.append('nombre_contenido', content.nombre_contenido);

      console.log(formData.get('id_clase'));
      console.log(formData.get('file'));
      console.log(formData.get('nombre_contenido'));

      const resp = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });

      const r = await resp.json();

      console.log(r);
    } catch (error) {
      console.log(error);
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
