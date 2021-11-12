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
import { filter } from 'rxjs/operators';
import { StudentComponent } from '../student.component';
import { StudentService } from 'src/app/shared/services/student.service';
import { User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { Responsable } from 'src/app/shared/models/responsable';
import { ResponsableService } from 'src/app/shared/services/responsable.service';
import { Grade } from 'src/app/shared/models/grade';
import { GradeService } from 'src/app/shared/services/grade.service';
import { Classroom } from 'src/app/shared/models/classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { Students } from 'src/app/shared/models/students';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  public today = new Date().toString();
  public studentForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nuevo estudiante';
  private codigo_personal!: string;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;


  public students!: Students[];
  public users!: User[];
  public responsables!: Responsable[];
  public grades!: Grade[];
  public classrooms!: Classroom[];

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private userService: UserService,
    private responsableService: ResponsableService,
    private gradeService: GradeService,
    private classroomService: ClassroomService



  ) { 

    this.codigo_personal= this.activatedRoute.snapshot.params.id;
    this.onInitForm();

  }

  ngOnInit(): void {

    
    this.getUsers();
    this.getResponsables();
    this.getGrades();
    this.getClassrooms();
    //this.subGrado();

    if (this.codigo_personal) {
      this.getOneStudent();
      this.action = 'Actualizar';
      this.title = 'Actualizar Estudiante';
    }

  }

  onInitForm(): void {
    this.studentForm = this.fb.group({
      codigo_personal: [null, Validators.required],
      primer_nombre_estudiante: [null, Validators.required],
      segundo_nombre_estudiante: [null, Validators.required],
      primer_apellido_estudiante: [null, Validators.required],
      segundo_apellido_estudiante: [null, Validators.required],
      fecha_nacimiento: [null, Validators.required],
      edad_estudiante: [null, Validators.required],
      sexo_estudiante: [null, Validators.required],
      idioma_estudiante: [null, Validators.required],
      lateralidad_estudiante: [null, Validators.required],
      direccion_estudiante: [null, Validators.required],
      observacion: [null, Validators.required],
      usuario: ['', Validators.required],
      responsable: ['', Validators.required],
      grado: ['', Validators.required],
      aula: ['', Validators.required],
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getResponsables(): void {
    this.responsableService.getResponsable().subscribe((res) => {
      this.responsables = res;
    });
  }


  getGrades(): void {
    this.gradeService.getGrade().subscribe((res) => {
      this.grades = res;
    });
  }

  getClassrooms(): void {
    this.classroomService.getClassroom().subscribe((res) => {
      this.classrooms = res;
    });
  }

  getOneStudent(): void {
    this.studentService.getOneStudent(this.codigo_personal).subscribe(
      (res) => {
          const fechaArray = res.fecha_nacimiento.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );

        this.studentForm.patchValue({
          codigo_personal:res.codigo_personal,
          primer_nombre_estudiante:res.primer_nombre_estudiante,
          segundo_nombre_estudiante:res.segundo_nombre_estudiante,
          primer_apellido_estudiante:res.primer_apellido_estudiante,
          segundo_apellido_estudiante:res.segundo_apellido_estudiante,
          fecha_nacimiento:fechaNac,
          edad_estudiante:res.edad_estudiante,
          sexo_estudiante:res.sexo_estudiante,
          idioma_estudiante:res.idioma_estudiante,
          lateralidad_estudiante:res.lateralidad_estudiante,
          direccion_estudiante:res.direccion_estudiante,
          observacion:res.observacion,
          usuario: res.usuario?.id || '',
          responsable: res.responsable?.id_responsable || '',
          grado: res.grado?.id_grado || '',
          aula: res.aula?.id_aula || '',
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
    if (this.studentForm.valid) {
      const data = this.studentForm.value;
      data.usuario = Number(data.usuario);
      data.responsable = Number(data.responsable);
      data.grado = Number(data.grado);
      data.aula = Number(data.aula);

      const user =
        this.users.find((u) => u.id == data.usuario) || null;
      data.usuario = user;

      const responsable = this.responsables.find((r) => r.id_responsable === data.responsable) || null;
      data.responsable = responsable;

      const grade =
        this.grades.find((g) => g.id_grado === data.grado) || null;
      data.grado = grade;

      const classroom =
        this.classrooms.find((cl) => cl.id_aula === data.aula) || null;
      data.aula = classroom;

      data.fecha_nacimiento = format(
        new Date(`${data.fecha_nacimiento} 00:00:00`),
        'yyyy/MM/dd'
      );

      switch (this.action) {
        case 'Guardar':
          this.saveClass(data);
          break;
        case 'Actualizar':
          data.id = this.codigo_personal;

          this.updatedStudent(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.studentForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.studentForm.controls, i)) {
          const control = this.studentForm.controls[i];

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

  saveClass(data: Students): void {
    this.studentService.saveStudent(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Estudiante guardado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/students/student-list']);
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

  updatedStudent(data: Students): void {
    this.studentService.updateStudent(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Estudiante actualizado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/students/student-list']);
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
      await this.router.navigate(['/admin/students/student-list']);
    }
  }




}
