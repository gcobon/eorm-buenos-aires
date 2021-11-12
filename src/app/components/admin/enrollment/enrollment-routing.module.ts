import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';



const routes :Routes=[

  {
 
     path: '',
     component: EnrollmentComponent,
     children:[
       {path: '',redirectTo: 'enrollment-list',pathMatch:'full'},
       {path: 'enrollment-list', component:EnrollmentListComponent},
       {path: 'enrollment-form', component:EnrollmentFormComponent},
       {path: 'enrollment-form/:id', component:EnrollmentFormComponent},
       
     ],
 
   },
 
 ];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
