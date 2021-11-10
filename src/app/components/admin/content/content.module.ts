import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './content.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [
    ContentComponent,
    ContentFormComponent,
    ContentListComponent

  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ContentModule { }
