import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/shared/models';
import { ProfessorService } from 'src/app/shared/services/professor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css'],
})
export class ProfessorListComponent implements OnInit {
  public professors!: Professor[];

  constructor(
    private professorService: ProfessorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors(): void {
    this.professorService.getProfessors().subscribe(
      (professors) => {
        this.professors = professors;
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

  onOpenEditProfessor(id: number) {
    this.router.navigate(['/admin/professors/professor-form/', id]);
  }

  async onDeleteProfessor(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.professorService.deleteProfessor(id).subscribe(
        () => {
          this.getProfessors();

          Swal.fire({
            title: 'Correcto',
            text: 'Profesor eliminado correctamente',
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
