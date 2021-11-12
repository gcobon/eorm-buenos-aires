import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // saveContent(
  //   archivo: File,
  //   idClase: string,
  //   nombreContenido: string
  // ): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'multipart/form-data',
  //       Accept: '*/*',
  //     }),
  //   };

  //   const formData = new FormData();

  //   formData.append('file', archivo);
  //   formData.append('id_clase', idClase);
  //   formData.append('nombre_contenido', nombreContenido);

  //   console.log({ archivo, idClase, nombreContenido });

  //   return this.http.post<any>(
  //     `${url_base}/contenidos/upload`,
  //     formData,
  //     httpOptions
  //   );
  // }

  async saveContent(archivo: File, idClase: string, nombreContenido: string) {
    const url = `${url_base}/contenidos/upload`;

    const head = new Headers();
    head.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    head.append('Content-type', `multipart/form-data`);
    head.append('Content-Disposition', `form-data`);
    head.append('Accept', `*/*`);

    const formData = new FormData();

    formData.append('file', archivo);
    formData.append('id_clase', idClase);
    formData.append('nombre_contenido', nombreContenido);

    console.log({ archivo, idClase, nombreContenido });

    try {
      const request = await fetch(url, {
        method: 'POST',
        headers: head,
        mode: 'cors',
        body: formData,
      });

      const res = await request.json();

      console.log(request);
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
