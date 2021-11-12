//numero cuatro agregar la ruta hija

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'professors',
        loadChildren: () =>
          import('./professor/professor.module').then((m) => m.ProfesorModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },
      {
        path: 'grade',
        loadChildren: () =>
          import('./grade/grade.module').then((m) => m.GradeModule),
      },

      {
        path: 'classroom',
        loadChildren: () =>
          import('./classroom/classroom.module').then((m) => m.ClassroomModule),
      },

      {
        path: 'course',
        loadChildren: () =>
          import('./course/course.module').then((m) => m.CourseModule),
      },

      {
        path: 'class',
        loadChildren: () =>
          import('./class/class.module').then((m) => m.ClassModule),
      },

      {
        path: 'content',
        loadChildren: () =>
          import('./content/content.module').then((m) => m.ContentModule),
      },

      {
        path: 'responsable',
        loadChildren: () =>
          import('./responsable/responsable.module').then((m) => m.ResponsableModule),
      },

      {
        path: 'enrollment',
        loadChildren: () =>
          import('./enrollment/enrollment.module').then((m) => m.EnrollmentModule),
      },

      {
        path: 'scors',
        loadChildren: () =>
          import('./scors/scors.module').then((m) => m.ScorsModule),
      },

         
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
