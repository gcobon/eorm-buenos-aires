import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomFormComponent } from './classroom-form/classroom-form.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
ClassroomComponent,
ClassroomFormComponent,
ClassroomListComponent



  ],
  imports: [
    
    CommonModule,
    ClassroomRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClassroomModule { }
