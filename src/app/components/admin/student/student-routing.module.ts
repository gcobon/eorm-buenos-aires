import { StudentListComponent } from './student-list/student-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: '', redirectTo: 'student-list', pathMatch: 'full' },
      { path: 'student-list', component: StudentListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
