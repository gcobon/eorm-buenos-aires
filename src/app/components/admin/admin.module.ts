import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { ResponsableFormComponent } from './responsable-form/responsable-form.component';
import { ResponsableListComponent } from './responsable/responsable-list/responsable-list.component';





@NgModule({
  declarations: [AdminComponent, ResponsableComponent, ResponsableFormComponent, ResponsableListComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
