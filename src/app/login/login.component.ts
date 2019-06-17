import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	});

	context = 'Login';

	constructor(public auth: AuthService, public router: Router) {}

	error = error =>
		({
			required: "You missed a spot! Don't forget to add your email and password.",
			email: "Hmm... that doesn't look like an email address."
		}[error]);

	setFormError = error => {
		this.loginForm.setErrors({
			message: this.error(error)
		});
	};

	ngOnInit() {
		this.loginForm.reset();
	}

	changeContext(context) {
		this.context = context;
	}

	isLoginIvalid() {
		const emailError = this.loginForm.get('email').errors;
		const passwordError = this.loginForm.get('password').errors;

		if (!emailError && !passwordError) return false;

		const errors = Object.keys({ ...emailError, ...passwordError });
		errors.forEach(this.setFormError);

		return true;
	}

	login(user) {
		this.auth
			.login(user)
			.then(() => {
				this.router.navigate(['/']);
			})
			.catch(err => this.loginForm.setErrors({ message: err.message }));
	}

	signup(user) {
		this.auth
			.signup(user)
			.then(() => {
				this.router.navigate(['/']);
			})
			.catch(err => this.loginForm.setErrors({ message: err.message }));
	}

	submit() {
		if (this.isLoginIvalid()) return;

		const user = {
			email: this.loginForm.get('email').value,
			password: this.loginForm.get('password').value
		};

		if (this.context === 'Login') return this.login(user);
		return this.signup(user);
	}
}
