
    import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
    import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
    import { ActivatedRoute, Router } from '@angular/router';
    import { format } from 'date-fns';
    import Swal from 'sweetalert2';
    import { GradeService } from 'src/app/shared/services/grade.service';
    import { Grade } from 'src/app/shared/models/grade';
   
    @Component({
      selector: 'app-grade-form',
      templateUrl: './grade-form.component.html',
      styleUrls: ['./grade-form.component.css'],
    })
    


    export class GradeFormComponent implements OnInit {
      public today = new Date().toString();
      public gradeForm!: FormGroup;
      public action: 'Guardar' | 'Actualizar' = 'Guardar';
      public title = 'Nuevo profesor';
      private id_grado!: number;
      @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;
    
    
      constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private gradeService: GradeService
      ) {
        this.id_grado = this.activatedRoute.snapshot.params.id;
        this.onInitForm();
      }
    
      ngOnInit(): void {
        if (this.id_grado) {
          this.getOneGrade();
          this.action = 'Actualizar';
          this.title = 'Actualizar grado';
        }
    
      }
    
    
      onInitForm(): void {
        this.gradeForm = this.fb.group({
          nombre_grado: [null, Validators.required],
          
        });
      }

      getOneGrade(): void {
      this.gradeService.getOneGrade(this.id_grado).subscribe(
          (res) => {
            /*  const fechaArray = res.fecha_nacimiento_profesor?.split('/');
    
            const d = fechaArray![2];
            const m = fechaArray![1];
            const y = fechaArray![0];
    
            const fechaNac = format(
              new Date(`${y}-${m}-${d} 00:00:00`),
              'yyyy-MM-dd'
            );*/
    
            this.gradeForm.patchValue({
              nombre_grado: res.nombre_grado,
            
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
        if (this.gradeForm.valid) {
          const data: Grade = this.gradeForm.value;
    
          /*data.fecha_nacimiento_profesor = format(
            new Date(`${data.fecha_nacimiento_profesor} 00:00:00`),
            'yyyy/MM/dd'
          );*/
    
          switch (this.action) {
            case 'Guardar':
              this.saveGrade(data);
              break;
            case 'Actualizar':
              data.id_grado = this.id_grado;
    
              this.updatedGrade(data);
              break;
    
            default:
              break;
          }
        } else {
          for (const i in this.gradeForm.controls) {
            if (
              Object.prototype.hasOwnProperty.call(this.gradeForm.controls, i)
            ) {
              const control = this.gradeForm.controls[i];
    
              control.markAsDirty();
              control.updateValueAndValidity();
            }
          }
    
          this.form.nativeElement.classList.add('was-validated');
        }
      }
    
    
    
      saveGrade(data: Grade): void {
        this.gradeService.saveGrade(data).subscribe(
          (res) => {
            if (res) {
              Swal.fire({
                title: 'Correcto',
                text: 'Grado guardado correctamente',
                icon: 'success',
              });
    
              this.router.navigate(['/admin/grade/grade-list']);
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
    
    
    
    
        
        updatedGrade(data: Grade): void {
          this.gradeService.updateGrade(data).subscribe(
            (res) => {
              if (res) {
                Swal.fire({
                  title: 'Correcto',
                  text: 'Grado actualizado correctamente',
                  icon: 'success',
                });
      
                this.router.navigate(['/admin/grade/grade-list']);
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
            await this.router.navigate(['/admin/grade/grade-list']);
          }
        }
    
    
    
    
      
    
    
      
    
    
    }