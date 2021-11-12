import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ScorsComponent } from './scors.component';
import { ScorsFormComponent } from './scors-form/scors-form.component';
import { ScorsListComponent } from './scors-list/scors-list.component';



const routes :Routes=[

  {
 
     path: '',
     component: ScorsComponent,
     children:[
       {path: '',redirectTo: 'scors-list',pathMatch:'full'},
       {path: 'scors-list', component:ScorsListComponent},
       {path: 'scors-form', component:ScorsFormComponent},
       {path: 'scors-form/:id', component:ScorsFormComponent},
       
     ],
 
   },
 
 ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScorsRoutingModule { }
