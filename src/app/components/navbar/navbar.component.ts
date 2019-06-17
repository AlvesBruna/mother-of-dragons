import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	showLogoutBtn = false;
	constructor(public auth: AuthService, public router: Router) {}
	showLogoutBtn = false;
	navlinks = [
		{
			name: 'Home',
			route: '/'
		},
		{
			name: 'Create',
			route: '/create'
		},
		{
			name: 'List',
			route: '/list'
		}
	];

	ngOnInit() {
		this.auth.isAuthenticated().then(user => (this.showLogoutBtn = !!user));
	}

	logout() {
		this.showLogoutBtn = false;
		this.auth.logout().then(() => this.router.navigate(['/login']));
	}
}
