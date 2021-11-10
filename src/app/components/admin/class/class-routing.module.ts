import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ClassComponent } from './class.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { ClassListComponent } from './class-list/class-list.component';



const routes :Routes=[

  {
 
     path: '',
     component: ClassComponent,
     children:[
       {path: '',redirectTo: 'class-list',pathMatch:'full'},
       {path: 'class-list', component:ClassListComponent},
       {path: 'class-form', component:ClassFormComponent},
       {path: 'class-form/:id', component:ClassFormComponent},
       
     ],
 
   },
 
 ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
