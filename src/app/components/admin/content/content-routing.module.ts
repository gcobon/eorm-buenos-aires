import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { CourseListComponent } from '../course/course-list/course-list.component';
import { ContentListComponent } from './content-list/content-list.component';


const routes :Routes=[

  {
 
     path: '',
     component: ContentComponent,
     children:[
       {path: '',redirectTo: 'content-list',pathMatch:'full'},
       {path: 'content-list', component:ContentListComponent},
       {path: 'content-form', component:ContentFormComponent},
       {path: 'content-form/:id', component:ContentFormComponent},
       
     ],
 
   },
 
 ];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ContentRoutingModule { }
