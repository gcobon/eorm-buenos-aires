import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthData, AuthResponse } from '../../shared/models';
import { environment } from './../../../environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  login(authData: AuthData) {
    this.http
      .post<AuthResponse>(`${url_base}/auth/login`, authData)
      .subscribe((res) => {
        const token = res.token;
        let payload;

        if (token) {
          payload = JSON.parse(atob(token.split('.')[1]));

          localStorage.setItem('token', res.token);
          localStorage.setItem('auth', JSON.stringify(payload));
        }

        if (authData.recuerdame) {
          localStorage.setItem('usuario', authData.nombreUsuario);
        } else {
          localStorage.removeItem('usuario');
        }

        this.router.navigate(['/home']);

        Swal.fire('Hola!', `Bienvenido ${authData.nombreUsuario}`);
      });
  }
}
