import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class AuthServiceMock {
	logout = jest.fn().mockReturnValue(Promise.resolve('ok'));
	$user = jest.fn().mockReturnValue(of(true));
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

	it('should hide logout button', () => {
		component.auth.$user = jest.fn().mockReturnValue(of(null));
		component.ngOnInit();
		fixture.detectChanges();

		expect(component.showLogoutBtn).toBeFalsy();
	});
});
