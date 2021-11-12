import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { EnrollmentComponent } from './enrollment.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentFormComponent,
    EnrollmentListComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class EnrollmentModule { }
