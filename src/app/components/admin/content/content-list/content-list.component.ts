import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContentService } from 'src/app/shared/services/content.service';
import { Content } from 'src/app/shared/models/content';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  public content!: Content[];
  constructor(private contentService: ContentService, private router: Router) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.contentService.getContent().subscribe(
      (classroom) => {
        this.content =this.content;
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

  onOpenEditContent(id: number) {
    this.router.navigate(['/admin/content/content-form/', id]);
  }

  async onDeleteContent(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro de eliminar?',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.contentService.deleteContent(id).subscribe(
        () => {
          this.getContent();

          Swal.fire({
            title: 'Correcto',
            text: 'Contenido eliminado correctamente',
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
