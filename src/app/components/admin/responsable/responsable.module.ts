import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableComponent } from './responsable.component';
import { ResponsableFormComponent } from './responsable-form/responsable-form.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';
import { ResponsableRoutingModule } from './responsable-routing.module';



@NgModule({
  declarations: [

    ResponsableComponent,
    ResponsableListComponent,
    ResponsableFormComponent

  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
    ReactiveFormsModule
  ]
})
export class ResponsableModule { }
