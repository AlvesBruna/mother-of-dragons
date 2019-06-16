import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonsComponent } from './dragons.component';
import { ListComponent } from './list/list.component';
import { OrderByPipe } from '../pipes/order-by/order-by.pipe';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-list',
	template: '<p>Mock DragonListComponent</p>'
})
class MockDragonListComponent {}

class AuthServiceMock {
	logout = jest.fn().mockReturnValue(Promise.resolve());
}

class RouterMock {
	navigate = jest.fn();
}
describe('DragonsComponent', () => {
	let component: DragonsComponent;
	let fixture: ComponentFixture<DragonsComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [DragonsComponent, MockDragonListComponent],
				providers: [
					{ provide: AuthService, useClass: AuthServiceMock },
					{ provide: Router, useClass: RouterMock }
				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DragonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
