import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DragonsComponent } from './dragons/dragons.component';
import { AuthGuard } from './guard/auth.guard';
import { ListComponent } from './dragons/list/list.component';
import { CreateComponent } from './dragons/create/create.component';

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
		path: 'list',
		component: ListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'create',
		component: CreateComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
