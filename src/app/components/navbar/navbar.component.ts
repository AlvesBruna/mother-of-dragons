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

	ngOnInit() {
		this.auth.$user().subscribe(user => {
			return (this.showLogoutBtn = !!user);
		});
	}

	logout() {
		this.auth.logout().then(() => this.router.navigate(['/login']));
	}
}
