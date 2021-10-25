import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfesorComponent } from './professor.component';

const routes: Routes = [
  {
    path: '',
    component: ProfesorComponent,
    children: [
      { path: '', redirectTo: 'professor-list', pathMatch: 'full' },
      { path: 'professor-list', component: ProfessorListComponent },
      { path: 'professor-form', component: ProfessorFormComponent },
      { path: 'professor-form/:id', component: ProfessorFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorRoutingModule {}
