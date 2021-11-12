import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Scors } from 'src/app/shared/models/scors';
import { ScorsService } from 'src/app/shared/services/scors.service';




@Component({
  selector: 'app-scors-list',
  templateUrl: './scors-list.component.html',
  styleUrls: ['./scors-list.component.css']
})
export class ScorsListComponent implements OnInit {
  public scorss!: Scors[];
  constructor(private scorsService: ScorsService, private router: Router) { }
  

  ngOnInit(): void {

    this.getScors();
  }

  getScors(): void {
    this.scorsService.getScors().subscribe(
      (scorss) => {
        this.scorss = scorss;
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

  onOpenEditScors(id: number) {
    this.router.navigate(['/admin/scors/scors-form/', id]);
  }

  async onDeleteScors(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.scorsService.deleteScors(id).subscribe(
        () => {
          this.getScors();

          Swal.fire({
            title: 'Correcto',
            text: 'Calificación eliminada correctamente',
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
