import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Content } from '../models/content';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getContent(): Observable<Content[]> {
    return this.http.get<Content[]>(`${url_base}/contenidos/listar`);
  }
  getOneContent(id: number): Observable<Content> {
    return this.http.get<Content>(`${url_base}/contenidos/buscar/${id}`);
  }

  saveContent(content: Content): Observable<Content> {
    return this.http.post<Content>(`${url_base}/contenidos/upload`, content);
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
