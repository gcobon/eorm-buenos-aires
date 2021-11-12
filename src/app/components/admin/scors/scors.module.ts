import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorsFormComponent } from './scors-form/scors-form.component';
import { ScorsListComponent } from './scors-list/scors-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScorsComponent } from './scors.component';
import { ScorsRoutingModule } from './scors-routing.module';


@NgModule({
  declarations: [
    ScorsFormComponent,
    ScorsListComponent,
    ScorsComponent,

  ],
  imports: [
    CommonModule,
    ScorsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ScorsModule { }
