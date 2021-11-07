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
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
