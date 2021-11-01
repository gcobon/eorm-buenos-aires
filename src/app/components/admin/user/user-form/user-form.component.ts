import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { User, Role } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  public title = 'Crear usuario';
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public userForm!: FormGroup;
  public roles!: Role[];
  public rolesCheck = {
    admin: false,
    profesor: false,
    estudiante: false,
  };
  public roleSelected: string[] = [];
  private id!: number;
  private subs = new Subscription();
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.id = this.route.snapshot.params.id;
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.getRoles();
    if (this.id) {
      this.getOneUser(this.id);
      this.title = 'Actualizar usuario';
      this.action = 'Actualizar';
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      nombre: [null, Validators.required],
      nombreUsuario: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  /**
   * Obtiene los roles
   */
  getRoles(): void {
    this.roleService.getRoles().subscribe((res) => {
      this.roles = res.map((rol) => {
        return {
          ...rol,
          checked: false,
        };
      });
    });
  }

  /**
   * Cancelar la operación
   */
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

  updateRolSelected(role: string) {
    if (this.roleSelected.includes(role)) {
      this.roleSelected = this.roleSelected.filter((e) => e !== role);
    } else {
      this.roleSelected.push(role);
    }
  }

  onAction(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.roles = this.roleSelected;

      console.log(userData);

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
          nombre_usuario: user.nombre,
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
