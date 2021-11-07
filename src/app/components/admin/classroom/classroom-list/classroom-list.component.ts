import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Classroom } from 'src/app/shared/models/classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {
  public classroom!: Classroom[];
  constructor(private classroomService: ClassroomService, private router: Router) {}
  ngOnInit(): void {
    this.getClassroom();
  }

  getClassroom(): void {
    this.classroomService.getClassroom().subscribe(
      (classroom) => {
        this.classroom = classroom;
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

  onOpenEditClassroom(id_aula: number) {
    this.router.navigate(['/admin/classroom/classroom-form/', id_aula]);
  }

  async onDeleteClassroom(id_aula: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.classroomService.deleteClassroom(id_aula).subscribe(
        () => {
          this.getClassroom();

          Swal.fire({
            title: 'Correcto',
            text: 'Aula eliminada correctamente',
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





