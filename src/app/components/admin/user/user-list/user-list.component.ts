import { Role } from 'src/app/shared/models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { User } from '../../../../shared/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public users!: User[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.userService.getUsers().subscribe((user) => {
      const data = user;

      this.users = data.map((us) => {
        return new User(
          us.nombre,
          us.nombreUsuario,
          us.email,
          us.roles,
          '',
          us.id
        );
      });
    });
  }

  onOpenEditUser(id: number) {
    this.router.navigate(['/admin/users/user-form/', id]);
  }

  async onDeleteUser(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.getUsuarios();

          Swal.fire({
            title: 'Correcto',
            text: 'Usuario eliminado correctamente',
            icon: 'success',
          });
        },
        (error) => {
          console.log(error);

          Swal.fire({
            title: 'Error',
            icon: 'error',
          });
        }
      );
    }
  }
}
