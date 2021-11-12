import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Responsable } from 'src/app/shared/models/responsable';
import { ResponsableService } from 'src/app/shared/services/responsable.service';


@Component({
  selector: 'app-responsable-form',
  templateUrl: './responsable-form.component.html',
  styleUrls: ['./responsable-form.component.css']
})
export class ResponsableFormComponent implements OnInit {

  public today = new Date().toString();
  public responsableForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nuevo responsable';
  private id_responsable!: number;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;


  constructor(

    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responsableService: ResponsableService
  ) {
    this.id_responsable= this.activatedRoute.snapshot.params.id;
    this.onInitForm();
  }


  ngOnInit(): void {

    if (this.id_responsable) {
      this.getOneResponsable();
      this.action = 'Actualizar';
      this.title = 'Actualizar profesor';
    }

  }


  onInitForm(): void {
    this.responsableForm = this.fb.group({

      primer_nombre_responsable: [null, Validators.required],
      segundo_nombre_responsable:  [null, Validators.required],
      primer_apellido_responsable:  [null, Validators.required],
      segundo_apellido_responsable: [null, Validators.required],
      dpi_responsable:  [null, Validators.required],
      fecha_nacimiento_responsable: [null, Validators.required],
      edad_responsable:  [null, Validators.required],
      sexo_responsable: [null, Validators.required],
      direccion_responsable: [null, Validators.required],
      telefono_responsable:  [null, Validators.required],
      email_responsable: [null, Validators.required],

    });
  }

  getOneResponsable(): void {
    this.responsableService.getOneResponsable(this.id_responsable).subscribe(
      (res) => {
        const fechaArray = res.fecha_nacimiento_responsable?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaNac = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );

        this.responsableForm.patchValue({
                    
          primer_nombre_responsable:res.primer_nombre_responsable,
          segundo_nombre_responsable:res.segundo_nombre_responsable,
          primer_apellido_responsable: res.primer_apellido_responsable,
          segundo_apellido_responsable: res.segundo_apellido_responsable,
          dpi_responsable: res.dpi_responsable,
          fecha_nacimiento_responsable: fechaNac,
          edad_responsable: res.edad_responsable,
          sexo_responsable: res.sexo_responsable,
          direccion_responsable:res.direccion_responsable,
          telefono_responsable: res.telefono_responsable,
          email_responsable: res.email_responsable,


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
    if (this.responsableForm.valid) {
      const data: Responsable = this.responsableForm.value;

      data.fecha_nacimiento_responsable = format(
        new Date(`${data.fecha_nacimiento_responsable} 00:00:00`),
        'yyyy/MM/dd'
      );

      switch (this.action) {
        case 'Guardar':
          this.saveResponsable(data);
          break;
        case 'Actualizar':
          data.id_responsable = this.id_responsable;

          this.updatedResponsable(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.responsableForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.responsableForm.controls, i)
        ) {
          const control = this.responsableForm.controls[i];

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

  saveResponsable(data: Responsable): void {
    this.responsableService.saveResponsable(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Responsable guardado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/responsable/responsable-list']);
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

  updatedResponsable(data: Responsable): void {
    this.responsableService.updateResponsable(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Responsable actualizado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/responsable/responsable-list']);
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
      await this.router.navigate(['/admin/responsable/responsable-list']);
    }
  }



}
