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
import { Scors } from 'src/app/shared/models/scors';
import { ScorsService } from 'src/app/shared/services/scors.service';
import { Students } from 'src/app/shared/models/students';
import { StudentService } from 'src/app/shared/services/student.service';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course-service';



@Component({
  selector: 'app-scors-form',
  templateUrl: './scors-form.component.html',
  styleUrls: ['./scors-form.component.css']
})
export class ScorsFormComponent implements OnInit {
  public today = new Date().toString();
  public scorsForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nueva calificacion';
  private id!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  public students!: Students[];
  public courses!: Course[];
  public promedioFinal:number=0;

  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scorsService: ScorsService,
    private studentService: StudentService,
    private courseService: CourseService,
  
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.onInitForm();

   }

  ngOnInit(): void {
    this.getStudents();
    this.getCourses();

    
    if (this.id) {
      this.getOneScors();
      this.action = 'Actualizar';
      this.title = 'Actualizar clase';
    }

  }

  onInitForm(): void {
    this.scorsForm = this.fb.group({
      nota_bim1: [null, Validators.required],
      nota_bim2: [null, Validators.required],
      nota_bim3: [null, Validators.required],
      nota_bim4: [null, Validators.required],
      promedio_final: [null, Validators.required],
      estudiante: ['', Validators.required],
      curso: ['', Validators.required],
      
    });
  }


  getStudents(): void {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res;
    });
  }

  getCourses(): void {
    this.courseService.getCourse().subscribe((res) => {
      this.courses = res;
    });
  }

  
  getOneScors(): void {
    this.scorsService.getOneScors(this.id).subscribe(
      (res) => {
        /*  const fechaArray = res.fecha_nacimiento_profesor?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );*/

        this.scorsForm.patchValue({
          nota_bim1: res.nota_bim1,
          nota_bim2: res.nota_bim2,
          nota_bim3: res.nota_bim3,
          nota_bim4: res.nota_bim4,
          promedio_final:res.promedio_final,
          estudiante:res.estudiante?.codigo_personal || '',
          curso: res.curso?.id || '',

          
         


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
    if (this.scorsForm.valid) {
      const data = this.scorsForm.value;
      data.estudiante = String(data.estudiante);
      data.curso = Number(data.curso);
      

      const student =
        this.students.find((e) => e.codigo_personal == data.estudiante) || null;
      data.estudiante = student;

      const course = this.courses.find((c) => c.id === data.curso) || null;
      data.curso = course;

      
      /*data.fecha_nacimiento_profesor = format(
        new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
        'yyyy/MM/dd'
      );*/

      switch (this.action) {
        case 'Guardar':
          this.saveScors(data);
          break;
        case 'Actualizar':
          data.id = this.id;

          this.updatedScors(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.scorsForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.scorsForm.controls, i)) {
          const control = this.scorsForm.controls[i];

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

  saveScors(data: Scors): void {
    this.scorsService.saveScors(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Calificación guardada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/scors/scors-list']);
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

  updatedScors(data: Scors): void {
    this.scorsService.updateScors(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Calificación actualizada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/scors/scors-list']);
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
      await this.router.navigate(['/admin/scors/scors-list']);
    }
  }





}
