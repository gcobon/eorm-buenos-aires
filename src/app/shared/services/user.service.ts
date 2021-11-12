import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${url_base}/usuarios/listar`);
  }

  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(`${url_base}/usuarios/buscar/${id}`);
  }

  saveUser(userData: User): Observable<User> {
    return this.http.post<User>(`${url_base}/auth/nuevo`, userData);
  }
/*
  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(
      `${url_base}/usuarios/actualizar/${userData}`,
      userData
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/usuarios/eliminar/${id}`);
  } */


  updateUser(users: User): Observable<User> {
    return this.http.put<User>(`${url_base}/usuarios/actualizar/${users.id}`,
      users
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${url_base}/usuarios/eliminar/${id}`);
  }





}
