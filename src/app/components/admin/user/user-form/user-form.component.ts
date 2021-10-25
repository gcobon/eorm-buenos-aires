import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public title = 'Crear usuario';
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public userForm!: FormGroup;
  private id!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.id = this.route.snapshot.params.id;
    this.initForm();
  }

  ngOnInit(): void {
    if (this.id) {
      this.getOneUser(this.id);
      this.title = 'Actualizar usuario';
      this.action = 'Actualizar';
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      nombre_usuario: [null, Validators.required],
      contraseña_usuario: [null, Validators.required],
      enabled: ['', Validators.required],
    });
  }

  async onCancel(): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      title: 'Cancelar',
      text: '¿Seguro de cancelar?',
      icon: 'question',
      confirmButtonText: 'Si, cancelar',
      showCancelButton: true,
      cancelButtonText: 'No, continuar',
    });

    if (isConfirmed) {
      await this.router.navigate(['/admin/users/user-list']);
    }
  }

  onAction(): void {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;

      switch (this.action) {
        case 'Guardar':
          this.onSaveUser(userData);
          break;
        case 'Actualizar':
          userData.id = this.id;

          this.onUpdateUser(userData);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.userForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.userForm.controls, i)) {
          const control = this.userForm.controls[i];

          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }

      this.form.nativeElement.classList.add('was-validated');

      const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        position: 'top-end',
      });

      Toast.fire({
        title: 'Verifique los campos requeridos',
        icon: 'info',
      });
    }
  }

  getOneUser(id: number): void {
    this.userService.getOneUser(id).subscribe(
      (user) => {
        this.userForm.patchValue({
          nombre_usuario: user.nombre_usuario,
          enabled: user.enabled,
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

  onSaveUser(user: User): void {
    this.userService.saveUser(user).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/admin/users/user-list']);
        }
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

  onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/admin/users/user-list']);
        }
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
