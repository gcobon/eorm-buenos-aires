import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Responsable } from 'src/app/shared/models/responsable';
import { ResponsableService } from 'src/app/shared/services/responsable.service';


@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.css']
})
export class ResponsableListComponent implements OnInit {
  public responsables!: Responsable[];
  constructor(
    private responsableService: ResponsableService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.getResponsable();
  }
  getResponsable(): void {
    this.responsableService.getResponsable().subscribe(
      (responsables) => {
        this.responsables = responsables;
      },
      (error) => {
        console.log(error);

        Swal.fire({
          title: 'Error',
          icon: 'error',
        });
      }
    );
  }

  onOpenEditResponsable(id_responsable: number) {
    this.router.navigate(['/admin/responsable/responsable-form/', id_responsable]);
  }

  async onDeleteResponsable(id_responsable: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.responsableService.deleteResponsable(id_responsable).subscribe(
        () => {
          this.getResponsable();

          Swal.fire({
            title: 'Correcto',
            text: 'Responsable eliminado correctamente',
            icon: 'success',
          });
        },
        (error) => {
          console.log(error);

          Swal.fire({
            title: 'Error',
            icon: 'error',
          });
        }
      );
    }
  }

}
