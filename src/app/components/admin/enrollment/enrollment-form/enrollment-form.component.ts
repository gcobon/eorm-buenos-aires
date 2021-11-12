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
import { Enrollment } from 'src/app/shared/models/enrollment';
import { EnrollmentService } from 'src/app/shared/services/enrollment.service';
import { Students } from 'src/app/shared/models/students';
import { StudentService } from 'src/app/shared/services/student.service';


@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  public today = new Date().toString();
  public enrollmentForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nueva matricula';
  private id_matricula!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  public students!: Students[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService


  ) { 

    this.id_matricula = this.activatedRoute.snapshot.params.id;
    this.onInitForm();
  }

  ngOnInit(): void {
    this.getStudents();
    
    //this.subGrado();

    if (this.id_matricula) {
      this.getOneEnrollment();
      this.action = 'Actualizar';
      this.title = 'Actualizar aula';
    }
  }

  onInitForm(): void {
    this.enrollmentForm = this.fb.group({
      fecha_matricula:[null, Validators.required],
      observaciones: [null, Validators.required],
      estudiante: ['', Validators.required],
    });
  }

  // subGrado(): void {
  //   this.classroomForm
  //     .get('grado')
  //     ?.valueChanges.pipe(filter((value) => value != 2))
  //     .subscribe((value) => {
  //       console.log(value);
  //     });
  // }

  getStudents(): void {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res;
    });
  }

  getOneEnrollment(): void {
    this.enrollmentService.getOneEnrollment(this.id_matricula).subscribe(
      (res) => {
        const fechaArray = res.fecha_matricula?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );

        this.enrollmentForm.patchValue({
          fecha_matricula:fechaNac,
          observaciones:res.observaciones,
          estudiante: res.estudiante?.codigo_personal || '',
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
    if (this.enrollmentForm.valid) {
      const data = this.enrollmentForm.value;

      data.estudiante = String(data.estudiante);
     

      const students = this.students.find((e) => e.codigo_personal === data.estudiante) || null;

      data.estudiante = students;

      data.fecha_matricula = format(
        new Date(`${data.fecha_matricula} 00:00:00`),
        'yyyy/MM/dd'
      );

      switch (this.action) {
        case 'Guardar':
          this.saveEnrollment(data);
          break;
        case 'Actualizar':
          data.id_matricula = this.id_matricula;

          this.updatedEnrollment(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.enrollmentForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.enrollmentForm.controls, i)
        ) {
          const control = this.enrollmentForm.controls[i];

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

  saveEnrollment(data: Enrollment): void {
    this.enrollmentService.saveEnrollment(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Matricula guardada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/enrollment/enrollment-list']);
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

  updatedEnrollment(data: Enrollment): void {
    this.enrollmentService.updateEnrollment(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Matricula actualizada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/enrollment/enrollment-list']);
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
      await this.router.navigate(['/admin/enrollment/enrollment-list']);
    }
  }




}
