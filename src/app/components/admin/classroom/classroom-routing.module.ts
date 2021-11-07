import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';
import { ClassroomFormComponent } from './classroom-form/classroom-form.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';


const routes :Routes=[

  {
 
     path: '',
     component: ClassroomComponent,
     children:[
       {path: '',redirectTo: 'classroom-list',pathMatch:'full'},
       {path: 'classroom-list', component:ClassroomListComponent},
       {path: 'classroom-form', component:ClassroomFormComponent},
       {path: 'classroom-form/:id', component:ClassroomFormComponent},
       
     ],
 
   },
 
 ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
