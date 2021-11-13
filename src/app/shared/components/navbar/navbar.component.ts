import { AuthData } from './../../models/auth.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public usuario = JSON.parse(localStorage.getItem('auth')!);
  constructor(private router: Router) {}

  ngOnInit(): void {}

  async logOut(): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      title: 'Atención',
      text: '¿Cerrar sesión?',
      icon: 'question',
      confirmButtonText: 'Si, cerrar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.router.navigate(['/auth/login']);
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
    }
  }
}
