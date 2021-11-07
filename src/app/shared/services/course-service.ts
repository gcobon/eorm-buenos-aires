
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from './../../../environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})


export class CourseService {

    constructor(private http: HttpClient) {}

    getCourse(): Observable<Course[]> {
      return this.http.get<Course[]>(`${url_base}/cursos/listar`);
    }
  
    getOneCourse(id: number): Observable<Course> {
      return this.http.get<Course>(`${url_base}/cursos/buscar/${id}`);
    }
  
    saveCourse(course: Course): Observable<Course> {
      return this.http.post<Course>(`${url_base}/cursos/crear`, course);
    }
  
    updateCourse(course: Course): Observable<Course> {
      return this.http.put<Course>(`${url_base}/cursos/actualizar/${course.id}`,
        course
      );
    }
  
    deleteCourse(id: number): Observable<any> {
      return this.http.delete<any>(`${url_base}/cursos/eliminar/${id}`);
    }





}
