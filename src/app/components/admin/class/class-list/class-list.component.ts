import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Class } from 'src/app/shared/models/class';
import { ClassService } from 'src/app/shared/services/class.service';
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  public classs!: Class[];
  constructor(private classService: ClassService, private router: Router) { }

  ngOnInit(): void {

    this.getClass();
  }

  getClass(): void {
    this.classService.getClass().subscribe(
      (classs) => {
        this.classs = classs;
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

  onOpenEditClass(id: number) {
    this.router.navigate(['/admin/class/class-form/', id]);
  }

  async onDeleteClass(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.classService.deleteClass(id).subscribe(
        () => {
          this.getClass();

          Swal.fire({
            title: 'Correcto',
            text: 'Curso eliminada correctamente',
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
