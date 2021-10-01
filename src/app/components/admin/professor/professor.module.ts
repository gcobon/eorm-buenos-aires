import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './professor-routing.module';
import { ProfesorComponent } from './professor.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';


@NgModule({
  declarations: [
    ProfesorComponent,
    ProfessorListComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule
  ]
})
export class ProfesorModule { }
