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
  @ViewChild('form', { static: false }) form!: ElementRef<HTMLFormElement>;

  public classes!: Class[];
  private archivoSeleccionado!:File;

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
     // fecha_creacion: [null, Validators.required],
      archivo:[null, Validators.required],
      clase: ['', Validators.required],
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
          //fecha_creacion: fechaCrea,
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
      console.log(data)
      data.clase = Number(data.clase);

      const clase = this.classes.find((g) => g.id === data.clase) || null;

      data.clase = clase;

     

      

     /* data.fecha_creacion = format(
        new Date(`${data.fecha_creacion} 00:00:00`),
        'yyyy/MM/dd'
      );*/

      switch (this.action) {
        case 'Guardar':
          this.saveContent(data);
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

  async saveContent(data: Content) {
    // this.contentService.saveContent(data).subscribe(
    //   (res) => {
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

    await this.contentService.saveContent(data);
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

  public imgTemp!: string | ArrayBuffer | null;

  cargarImagen(event: any): void {
    let file = event.target.files[0];

    const typeAllowed = ['image/jpg', 'image/jpeg', 'image/png'];

    if (!file) {
      this.imgTemp = '';
      return;
    }

    if (!typeAllowed.includes(file.type)) {
      Swal.fire({
        title: 'Info',
        text: 'La imagen debe ser de tipo "JPEG/PNG/JPG"',
        icon: 'info',
        showConfirmButton: false,
        timer: 3500,
      });
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //this.imagenSubir = file;
    };
  }
}
