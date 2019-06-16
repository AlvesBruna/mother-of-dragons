import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

class AuthServiceMock {
	logout = jest.fn().mockReturnValue(Promise.resolve('ok'));
}

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [RouterTestingModule],
				declarations: [NavbarComponent],
				providers: [{ provide: AuthService, useClass: AuthServiceMock }]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should logout', () => {
		component.router.navigate = jest.fn();
		const logoutBtn = fixture.debugElement.query(By.css('#logout-btn')).nativeElement;
		logoutBtn.click();

		expect(component.auth.logout).toHaveBeenCalled();
	});
});
