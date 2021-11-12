import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Professor } from 'src/app/shared/models';
import { ProfessorService } from 'src/app/shared/services/professor.service';
import { User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css'],
})
export class ProfessorFormComponent implements OnInit {
  public today = new Date().toString();
  public professorForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nuevo profesor';
  private id!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;
  public profesores!: Professor[];
  public users!: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private professorService: ProfessorService,
    private userService: UserService,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.onInitForm();
  }

  ngOnInit(): void {
    
    this.getUsers();

    if (this.id) {
      this.getOneProfessor();
      this.action = 'Actualizar';
      this.title = 'Actualizar profesor';
    }
  }

  onInitForm(): void {
    this.professorForm = this.fb.group({
      primer_nombre_profesor: [null, Validators.required],
      segundo_nombre_profesor: [null, Validators.required],
      primer_apellido_profesor: [null, Validators.required],
      segundo_apellido_profesor: [null, Validators.required],
      dpi_profesor: [null, Validators.required],
      telefono_profesor: [null, Validators.required],
      direccion_profesor: [null, Validators.required],
      fecha_nacimiento_profesor: [null, Validators.required],
      email_profesor: [null, Validators.required],
      edad_profesor: [null, Validators.required],
      sexo_profesor: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getOneProfessor(): void {
    this.professorService.getOneProfessor(this.id).subscribe(
      (res) => {
        const fechaArray = res.fecha_nacimiento_profesor?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );

        this.professorForm.patchValue({
          primer_nombre_profesor: res.primer_nombre_profesor,
          segundo_nombre_profesor: res.segundo_nombre_profesor,
          primer_apellido_profesor: res.primer_apellido_profesor,
          segundo_apellido_profesor: res.segundo_apellido_profesor,
          dpi_profesor: res.dpi_profesor,
          telefono_profesor: res.telefono_profesor,
          direccion_profesor: res.direccion_profesor,
          fecha_nacimiento_profesor: fechaNac,
          email_profesor: res.email_profesor,
          edad_profesor: res.edad_profesor,
          sexo_profesor: res.sexo_profesor,
          usuario:res.usuario?.id||'',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo salió mal',
          icon: 'error',
        });
      }
    );
  }

  onAction(): void {
    if (this.professorForm.valid) {
      const data = this.professorForm.value;
      data.usuario = Number(data.usuario);
      
      const user =
        this.users.find((u) => u.id == data.usuario) || null;
      data.usuario = user;

      



      data.fecha_nacimiento_profesor = format(
        new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
        'yyyy/MM/dd'
      );

      switch (this.action) {
        case 'Guardar':
          this.saveProfessor(data);
          break;
        case 'Actualizar':
          data.id = this.id;

          this.updatedProfessor(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.professorForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.professorForm.controls, i)
        ) {
          const control = this.professorForm.controls[i];

          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }

      this.form.nativeElement.classList.add('was-validated');
    }
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

  saveProfessor(data: Professor): void {
    this.professorService.saveProfessor(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Profesor guardado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/professors/professor-list']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo salió mal',
          icon: 'error',
        });
      }
    );
  }

  updatedProfessor(data: Professor): void {
    this.professorService.updateProfessor(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Profesor actualizado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/professors/professor-list']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo salió mal',
          icon: 'error',
        });
      }
    );
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
      await this.router.navigate(['/admin/professors/professor-list']);
    }
  }
}
