import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonsComponent } from './dragons.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
	selector: 'app-list',
	template: '<p>Mock DragonListComponent</p>'
})
class MockDragonListComponent {}

describe('DragonsComponent', () => {
	let component: DragonsComponent;
	let fixture: ComponentFixture<DragonsComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [RouterTestingModule],
				declarations: [DragonsComponent, MockDragonListComponent]
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
