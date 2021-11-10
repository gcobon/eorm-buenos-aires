import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
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

import { Class } from 'src/app/shared/models/class';
import { ClassService } from 'src/app/shared/services/class.service';
import { Professor } from 'src/app/shared/models';
import { ProfessorService } from 'src/app/shared/services/professor.service';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course-service';
import { Classroom } from 'src/app/shared/models/classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  public today = new Date().toString();
  public classForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nueva clase';
  private id!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  public professors!: Professor[];
  public courses!: Course[];
  public classrooms!: Classroom[];



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classService: ClassService,
    private professorService: ProfessorService,
    private courseService:CourseService,
    private classroomService:ClassroomService

  ) { 
    this.id = this.activatedRoute.snapshot.params.id;
    this.onInitForm();

  }

  ngOnInit(): void {
    this.getProfessors();
    this.getCourses();
    this.getClassrooms();
    //this.subGrado();

    if (this.id) {
      this.getOneClass();
      this.action = 'Actualizar';
      this.title = 'Actualizar clase';

  }
}

  onInitForm(): void {
    this.classForm = this.fb.group({
      descripcion: [null, Validators.required],
      profesor: ['', Validators.required],
      curso: ['', Validators.required],
      aula: ['', Validators.required],
    });
  }


  getProfessors(): void {
    this.professorService.getProfessors().subscribe((res) => {
      this.professors = res;
    });
  }


  getCourses(): void {
    this.courseService.getCourse().subscribe((res) => {
      this.courses= res;
    });
  }

  getClassrooms(): void {
    this.classroomService.getClassroom().subscribe((res) => {
      this.classrooms = res;
    });
  }


  getOneClass(): void {
    this.classService.getOneClass(this.id).subscribe(
      (res) => {
        /*  const fechaArray = res.fecha_nacimiento_profesor?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );*/

        this.classForm.patchValue({
          descripcion: res.descripcion,
          profesor: res.profesor?.id || '',
          curso: res.curso?.id|| '',
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
    if (this.classForm.valid) {
      const data = this.classForm.value;
      data.profesor=Number(data.profesor);
      data.curso = Number(data.curso);
      data.aula=Number(data.aula);
      
      const professor=this.professors.find((p)=>p.id==data.profesor) || null;
      data.profesor=professor;

      const course = this.courses.find((c) => c.id === data.course) || null;
      data.curso = course;


      const classroom = this.classrooms.find((cl) => cl.id_aula === data.classroom) || null;
      data.clase = classroom;

      /*data.fecha_nacimiento_profesor = format(
        new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
        'yyyy/MM/dd'
      );*/

      switch (this.action) {
        case 'Guardar':
          this.saveClass(data);
          break;
        case 'Actualizar':
          data.id= this.id;

          this.updatedClass(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.classForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.classForm.controls, i)
        ) {
          const control = this.classForm.controls[i];

          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }

      this.form.nativeElement.classList.add('was-validated');
    }
  }

  saveClass(data: Class): void {
    this.classService.saveClass(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Clase guardada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/class/class-list']);
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

  updatedClass(data: Class): void {
    this.classService.updateClass(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Clase actualizada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/class/class-list']);
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
      await this.router.navigate(['/admin/class/class-list']);
    }
  }




}
