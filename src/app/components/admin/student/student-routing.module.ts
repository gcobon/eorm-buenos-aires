import { StudentListComponent } from './student-list/student-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: '', redirectTo: 'student-list', pathMatch: 'full' },
      { path: 'student-list', component: StudentListComponent },
      { path: 'student-form', component: StudentFormComponent },
      { path: 'student-form/:id', component: StudentFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
