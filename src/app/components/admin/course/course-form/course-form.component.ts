import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { CourseService } from 'src/app/shared/services/course-service';
import { Course } from 'src/app/shared/models/course';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  public today = new Date().toString();
  public courseForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nuevo curso';
  private id!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService


  ) { 

    this.id= this.activatedRoute.snapshot.params.id;
    this.onInitForm();
    
  }

  ngOnInit(): void {
    if (this.id) {
      this.getOneCourse();
      this.action = 'Actualizar';
      this.title = 'Actualizar grado';
    }


  }

  onInitForm(): void {
    this.courseForm = this.fb.group({
      nombre_curso: [null, Validators.required],
      
    });
  }

  getOneCourse(): void {
  this.courseService.getOneCourse(this.id).subscribe(
      (res) => {
        /*  const fechaArray = res.fecha_nacimiento_profesor?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );*/

        this.courseForm.patchValue({
          nombre_curso: res.nombre_curso,
        
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
    if (this.courseForm.valid) {
      const data: Course = this.courseForm.value;

      /*data.fecha_nacimiento_profesor = format(
        new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
        'yyyy/MM/dd'
      );*/

      switch (this.action) {
        case 'Guardar':
          this.saveCourse(data);
          break;
        case 'Actualizar':
          data.id = this.id;

          this.updatedCourse(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.courseForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.courseForm.controls, i)
        ) {
          const control = this.courseForm.controls[i];

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



  saveCourse(data: Course): void {
    this.courseService.saveCourse(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Curso guardado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/course/course-list']);
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




    
    updatedCourse(data: Course): void {
      this.courseService.updateCourse(data).subscribe(
        (res) => {
          if (res) {
            Swal.fire({
              title: 'Correcto',
              text: 'Curso actualizado correctamente',
              icon: 'success',
            });
  
            this.router.navigate(['/admin/course/course-list']);
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
        await this.router.navigate(['/admin/course/course-list']);
      }
    }







}
