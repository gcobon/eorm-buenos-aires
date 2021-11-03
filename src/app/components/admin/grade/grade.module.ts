import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeComponent } from './grade.component';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({

  
declarations: [
GradeComponent,
GradeListComponent,
GradeFormComponent


  ],

  imports: [
    CommonModule,
    GradeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]

   

})
export class GradeModule {
  

 }
