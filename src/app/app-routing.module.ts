import { LoginModule } from './components/login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth/login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
