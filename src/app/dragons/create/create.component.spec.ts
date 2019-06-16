import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DragonsService } from 'src/app/services/dragons/dragons.service';

class DragonsServiceMock {
	createDragon = jest.fn().mockReturnValue(Promise.resolve());
}
describe('CreateComponent', () => {
	let component: CreateComponent;
	let fixture: ComponentFixture<CreateComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [ReactiveFormsModule, RouterTestingModule],
				declarations: [CreateComponent],
				providers: [{ provide: DragonsService, useClass: DragonsServiceMock }]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create a dragon', () => {
		window.alert = jest.fn();
		component.dragonForm.reset = jest.fn();
		const nameField = component.dragonForm.controls['name'];
		const typeField = component.dragonForm.controls['type'];

		nameField.setValue('Drogon');
		typeField.setValue('Reptile, magical');
		component.createDragon();

		expect(component.dragonService.createDragon).toHaveBeenCalled();
	});

	describe('should validate required fields', () => {
		it('validate dragon name', () => {
			const nameField = component.dragonForm.controls['name'];
			const typeField = component.dragonForm.controls['type'];

			nameField.setValue('');
			typeField.setValue('Reptile, magical');
			component.createDragon();

			expect(component.dragonForm.errors.message).toBe(
				"You missed a spot! Don't forget to provide a name and type for your dragon."
			);
		});

		it('validate dragon type', () => {
			const nameField = component.dragonForm.controls['name'];
			const typeField = component.dragonForm.controls['type'];

			nameField.setValue('Drogon');
			typeField.setValue('');
			component.createDragon();

			expect(component.dragonForm.errors.message).toBe(
				"You missed a spot! Don't forget to provide a name and type for your dragon."
			);
		});
	});
});
