import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/shared/models/grade';
import { GradeService } from 'src/app/shared/services/grade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
public grade !: Grade[];
  constructor(
private gradeService: GradeService,
private router: Router

  ) { }

  ngOnInit(): void {
    this.getGrade();
  }

  getGrade(): void {
    this.gradeService.getGrade().subscribe(
      (grade) => {
        this.grade = grade;
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

  onOpenEditGrade(id: number) {
    this.router.navigate(['/admin/grade/grade-form/', id]);
  }

  async onDeleteGrade(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.gradeService.deleteGrade(id).subscribe(
        () => {
          this.getGrade();

          Swal.fire({
            title: 'Correcto',
            text: 'Grado eliminado correctamente',
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
