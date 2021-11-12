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
import { ContentService } from 'src/app/shared/services/content.service';
import { Content } from 'src/app/shared/models/content';
import { ClassService } from 'src/app/shared/services/class.service';
import { Class } from 'src/app/shared/models/class';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css'],
})
export class ContentFormComponent implements OnInit {
  public today = new Date().toString();
  public contentForm!: FormGroup;
  public action: 'Guardar' | 'Actualizar' = 'Guardar';
  public title = 'Nuevo Contenido';
  private id!: number;
  public classes!: Class[];
  private fileToUpload!: File;
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private classService: ClassService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.onInitForm();
  }

  ngOnInit(): void {
    this.getClass();

    //this.subGrado();

    if (this.id) {
      this.getOneContent();
      this.action = 'Actualizar';
      this.title = 'Actualizar aula';
    }
  }

  onInitForm(): void {
    this.contentForm = this.fb.group({
      nombre_contenido: [null, Validators.required],
      archivo: [''],
      clase: ['', Validators.required],
    });
  }

  getClass(): void {
    this.classService.getClass().subscribe((res) => {
      this.classes = res;
    });
  }

  getOneContent(): void {
    this.contentService.getOneContent(this.id).subscribe(
      (res) => {
        const fechaArray = res.fecha_creacion?.split('/');

        const d = fechaArray![2];
        const m = fechaArray![1];
        const y = fechaArray![0];

        const fechaCrea = format(
          new Date(`${y}-${m}-${d} 00:00:00`),
          'yyyy-MM-dd'
        );

        this.contentForm.patchValue({
          nombre_contenido: res.nombre_contenido,
          fecha_creacion: fechaCrea,
          archivo: '',
          clase: res.clase?.id || '',
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
    if (this.contentForm.valid) {
      const data = this.contentForm.value;

      switch (this.action) {
        case 'Guardar':
          this.saveContent(
            this.fileToUpload,
            data.clase,
            data.nombre_contenido
          );
          break;
        case 'Actualizar':
          data.id = this.id;

          this.updatedContent(data);
          break;

        default:
          break;
      }
    } else {
      for (const i in this.contentForm.controls) {
        if (
          Object.prototype.hasOwnProperty.call(this.contentForm.controls, i)
        ) {
          const control = this.contentForm.controls[i];

          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }

      this.form.nativeElement.classList.add('was-validated');
    }
  }

  saveContent(archivo: File, idClase: string, nombreContenido: string) {
    this.contentService.saveContent(archivo, idClase, nombreContenido);
    // .subscribe(
    //   (res) => {
    //     console.log(res);

    //     if (res) {
    //       Swal.fire({
    //         title: 'Correcto',
    //         text: 'Contenido guardado correctamente',
    //         icon: 'success',
    //       });

    //       this.router.navigate(['/admin/content/content-list']);
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //     Swal.fire({
    //       title: 'Error',
    //       text: 'Algo salió mal',
    //       icon: 'error',
    //     });
    //   }
    // );
  }

  updatedContent(data: Content): void {
    this.contentService.updateContent(data).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            title: 'Correcto',
            text: 'Contenido actualizado correctamente',
            icon: 'success',
          });

          this.router.navigate(['/admin/content/content-list']);
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
      await this.router.navigate(['/admin/content/content-list']);
    }
  }

  onLoadFile(event: any): void {
    this.fileToUpload = event.target.files[0];
  }
}
