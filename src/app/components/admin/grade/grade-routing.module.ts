import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { GradeComponent } from './grade.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeListComponent } from './grade-list/grade-list.component';


const routes :Routes=[

 {

    path: '',
    component: GradeComponent,
    children:[
      {path: '',redirectTo: 'grade-list',pathMatch:'full'},
      {path: 'grade-list', component:GradeListComponent},
      {path: 'grade-form', component:GradeFormComponent},
      {path: 'grade-form/:id', component:GradeFormComponent},
      
    ],

  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
