import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './professor-routing.module';
import { ProfesorComponent } from './professor.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfesorComponent,
    ProfessorListComponent,
    ProfessorFormComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfesorModule { }
