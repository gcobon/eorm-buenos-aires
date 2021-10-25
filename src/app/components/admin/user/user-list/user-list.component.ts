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
    this.userService.getUsers().subscribe(
      (user) => {
        const data = user;

        this.users = data.map((us) => {
          return {
            ...us,
            roles: us.roles?.toString(),
          };
        });
      },
      (error) => {
        console.log(error);

        Swal.fire({
          title: 'Error',
          icon: 'error',
        });
      },
      () => null
    );
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
            text: 'Profesor eliminado correctamente',
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
