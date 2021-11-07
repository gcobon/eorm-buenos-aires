import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';


const routes :Routes=[

  {
 
     path: '',
     component: CourseComponent,
     children:[
       {path: '',redirectTo: 'course-list',pathMatch:'full'},
       {path: 'course-list', component:CourseListComponent},
       {path: 'course-form', component:CourseFormComponent},
       {path: 'course-form/:id', component:CourseFormComponent},
       
     ],
 
   },
 
 ];
 


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
