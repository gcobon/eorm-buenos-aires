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
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { Classroom } from 'src/app/shared/models/classroom';
import { Grade } from 'src/app/shared/models/grade';
import { GradeService } from 'src/app/shared/services/grade.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css'],
})
export class ClassroomFormComponent implements OnInit {
  public today = new Date().toString();
  public classroomForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nueva aula';
  private id_aula!: number;
  public sections = ['A', 'B', 'C', 'D', 'E', 'F'];
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  public grades!: Grade[];
  //classroom:Classroom =new Classroom();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classroomService: ClassroomService,
    private gradeService: GradeService
  ) {
    this.id_aula = this.activatedRoute.snapshot.params.id;
    this.onInitForm();
  }

  ngOnInit(): void {
    this.getGrades();
    
    //this.subGrado();

    if (this.id_aula) {
      this.getOneClassroom();
      this.action = 'Actualizar';
      this.title = 'Actualizar aula';
    }
    //agregamos metodo para realizar el get de los grados FK
    // this.classroomService.getGrade()
    //.subscribe(response=>this.grades=response);
  }

  onInitForm(): void {
    this.classroomForm = this.fb.group({
      capacidad_aula: [null, Validators.required],
      nombre_aula: [null, Validators.required],
      seccion_aula: ['', Validators.required],
      grado: ['', Validators.required],
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

  getGrades(): void {
    this.gradeService.getGrade().subscribe((res) => {
      this.grades = res;
    });
  }

  getOneClassroom(): void {
    this.classroomService.getOneClassroom(this.id_aula).subscribe(
      (res) => {
        /*  const fechaArray = res.fecha_nacimiento_profesor?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );*/

        this.classroomForm.patchValue({
          capacidad_aula: res.capacidad_aula,
          nombre_aula: res.nombre_aula,
          seccion_aula: res.seccion_aula,
          grado: res.grado?.id_grado || '',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo sali?? mal',
          icon: 'error',
        });
      }
    );
  }

  onAction(): void {
    if (this.classroomForm.valid) {
      const data = this.classroomForm.value;
      data.grado = Number(data.grado);
      data.capacidad_aula = Number(data.capacidad_aula);

      const grade = this.grades.find((g) => g.id_grado === data.grado) || null;

      data.grado = grade;

      /*data.fecha_nacimiento_profesor = format(
        new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
        'yyyy/MM/dd'
      );*/

      switch (this.action) {
        case 'Guardar':
          this.saveClassroom(data);
          break;
        case 'Actualizar':
          data.id_aula = this.id_aula;

          this.updatedClassroom(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.classroomForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.classroomForm.controls, i)
        ) {
          const control = this.classroomForm.controls[i];

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

  saveClassroom(data: Classroom): void {
    this.classroomService.saveClassroom(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Aula guardada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/classroom/classroom-list']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo sali?? mal',
          icon: 'error',
        });
      }
    );
  }

  updatedClassroom(data: Classroom): void {
    this.classroomService.updateClassroom(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Aula actualizada correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/classroom/classroom-list']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Algo sali?? mal',
          icon: 'error',
        });
      }
    );
  }

  async onCancel(): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      title: 'Cancelar',
      text: '??Seguro de cancelar?',
      icon: 'question',
      confirmButtonText: 'Si, cancelar',
      showCancelButton: true,
      cancelButtonText: 'No, continuar',
    });

    if (isConfirmed) {
      await this.router.navigate(['/admin/classroom/classroom-list']);
    }
  }
}
