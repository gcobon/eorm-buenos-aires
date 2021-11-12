import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentComponent } from '../student.component';
import { StudentService } from 'src/app/shared/services/student.service';
import { Students } from 'src/app/shared/models/students';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students!: Students[];
    

  constructor(

    private studentService: StudentService,
    private router: Router

  ) {}

  ngOnInit(): void {

    this.getStudents();

  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
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

  onOpenEditStudent(codigo_personal: string) {
    this.router.navigate(['/admin/students/student-form/',codigo_personal]);
  }

  async onDeleteStudent(codigo_personal: string) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.studentService.deleteStudent(codigo_personal).subscribe(
        () => {
          this.getStudents();

          Swal.fire({
            title: 'Correcto',
            text: 'Estudiante eliminado correctamente',
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
