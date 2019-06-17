import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth/auth.service';

class AuthServiceMock {
	login = jest.fn().mockReturnValue(Promise.resolve());
}
class RouterMock {
	navigate = jest.fn();
}
describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const errorMessage = {
		required: "You missed a spot! Don't forget to add your email and password.",
		email: "Hmm... that doesn't look like an email address."
	};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [ReactiveFormsModule, RouterTestingModule],
				declarations: [LoginComponent],
				providers: [
					{ provide: Router, useClass: RouterMock },
					{ provide: AuthService, useClass: AuthServiceMock }
				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should login', () => {
		const user = {
			email: 'nome@email.com',
			password: '123'
		};
		component.loginForm.controls['email'].setValue(user.email);
		component.loginForm.controls['password'].setValue(user.password);
		component.submit();

		expect(component.loginForm.errors).toBeNull();
		expect(component.auth.login).toHaveBeenCalledWith(user);
	});

	describe('should validate email', () => {
		it('when email is empty', () => {
			const emailField = component.loginForm.controls['email'];
			emailField.setValue('');
			component.submit();

			expect(emailField.invalid).toBeTruthy();
			expect(component.loginForm.errors.message).toBe(errorMessage.required);
		});

		it('when email is invalid', () => {
			component.loginForm.controls['password'].setValue('123');
			const emailField = component.loginForm.controls['email'];
			const invalidEmails = ['@@', 'a@', '@a', 'a.com'];

			invalidEmails.forEach(email => {
				emailField.setValue(email);
				component.submit();

				expect(emailField.invalid).toBeTruthy();
				expect(component.loginForm.errors.message).toBe(errorMessage.email);
			});
		});
	});

	describe('should validate password', () => {
		it('when password is empty', () => {
			const passwordField = component.loginForm.controls['password'];
			passwordField.setValue('');
			component.submit();

			expect(passwordField.invalid).toBeTruthy();
			expect(component.loginForm.errors.message).toBe(errorMessage.required);
		});
	});

	describe('should call the correct function according to the context', () => {
		it('when the context is login', () => {
			component.login = jest.fn();
			component.context = 'Login';
			const user = {
				email: 'nome@email.com',
				password: '123'
			};
			component.loginForm.controls['email'].setValue(user.email);
			component.loginForm.controls['password'].setValue(user.password);
			component.submit();

			expect(component.login).toHaveBeenCalledWith(user);
		});

		it('when the context is sign up', () => {
			component.signup = jest.fn();
			component.context = 'Sign Up';
			const user = {
				email: 'nome@email.com',
				password: '123'
			};
			component.loginForm.controls['email'].setValue(user.email);
			component.loginForm.controls['password'].setValue(user.password);
			component.submit();

			expect(component.signup).toHaveBeenCalledWith(user);
		});
	});
});
