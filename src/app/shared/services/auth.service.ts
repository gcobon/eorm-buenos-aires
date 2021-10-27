import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../../shared/models';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.url_base;

  private usuarios = [
    {
      id_usuario: 1,
      usuario: 'juan',
      password: '123456',
      enabled: true,
      rol: 'profesor',
    },
    {
      id_usuario: 2,
      usuario: 'jose',
      password: '123456',
      enabled: true,
      rol: 'estudiante',
    },
    {
      id_usuario: 3,
      usuario: 'ricardo',
      password: '123456',
      enabled: true,
      rol: 'estudiante',
    },
    {
      id_usuario: 4,
      usuario: 'maria',
      password: '123456',
      enabled: true,
      rol: 'profesor',
    },
    {
      id_usuario: 5,
      usuario: 'josefina',
      password: '123456',
      enabled: true,
      rol: 'profesor',
    },
  ];

  constructor(private router: Router) {}

  login(authData: AuthData): boolean {
    const usuario = this.usuarios.find((us) => us.usuario === authData.usuario);

    if (!usuario) {
      return false;
    }

    if (usuario.password === authData.password) {
      switch (usuario.rol) {
        case 'estudiante':
          this.router.navigate(['/home']);
          break;
        case 'profesor':
          this.router.navigate(['/admin']);
          break;
        default:
          alert('rol no adminitdo');
          break;
      }

      return true;
    }

    return false;
  }
}
