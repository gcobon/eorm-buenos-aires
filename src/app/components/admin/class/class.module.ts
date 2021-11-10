import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRoutingModule } from './class-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
ClassComponent,
ClassFormComponent,
ClassListComponent

  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClassModule { }
