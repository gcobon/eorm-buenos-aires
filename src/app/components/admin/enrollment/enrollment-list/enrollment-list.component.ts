import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Enrollment } from 'src/app/shared/models/enrollment';
import { EnrollmentService } from 'src/app/shared/services/enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  public enrollment!: Enrollment[];
  constructor(private enrollmentService: EnrollmentService, private router: Router) { }

  ngOnInit(): void {
    this.getEnrollment();
  }

  getEnrollment(): void {
    this.enrollmentService.getEnrollment().subscribe(
      (enrollment) => {
        this.enrollment = enrollment;
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

  onOpenEditEnrollment(id_matricula: number) {
    this.router.navigate(['/admin/enrollment/enrollment-form/', id_matricula]);
  }

  async onDeleteEnrollment(id_matricula: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.enrollmentService.deleteEnrollment(id_matricula).subscribe(
        () => {
          this.getEnrollment();

          Swal.fire({
            title: 'Correcto',
            text: 'Matricula eliminada correctamente',
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
