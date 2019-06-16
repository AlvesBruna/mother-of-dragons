import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DragonsComponent } from './dragons/dragons.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'dragons',
    pathMatch: 'full'
  },
  {
    path: 'dragons',
    component: DragonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
