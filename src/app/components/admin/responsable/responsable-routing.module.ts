import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResponsableComponent } from './responsable.component';
import { ResponsableFormComponent } from './responsable-form/responsable-form.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsableComponent,
    children: [
      { path: '', redirectTo: 'responsable-list', pathMatch: 'full' },
      { path: 'responsable-list', component: ResponsableListComponent },
      { path: 'responsable-form', component: ResponsableFormComponent },
      { path: 'responsable-form/:id', component: ResponsableFormComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsableRoutingModule { }
