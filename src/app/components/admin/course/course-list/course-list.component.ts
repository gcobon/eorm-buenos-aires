import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public course!: Course[];
  
  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    this.courseService.getCourse().subscribe(
      (course) => {
        this.course = course;
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

  onOpenEditCourse(id: number) {
    this.router.navigate(['/admin/course/course-form/', id]);
  }

  async onDeleteCourse(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.courseService.deleteCourse(id).subscribe(
        () => {
          this.getCourse();

          Swal.fire({
            title: 'Correcto',
            text: 'Curso eliminado correctamente',
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
