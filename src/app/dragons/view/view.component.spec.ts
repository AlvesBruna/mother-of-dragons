import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

const dragon = {
	id: '3',
	name: 'Viserion',
	type: 'Reptile, magical',
	createdAt: '2019-06-03T05:43:44.859Z'
};
class ActivatedRouteMock {
	snapshot = {
		paramMap: { get: jest.fn().mockReturnValue('3') }
	};
}
describe('ViewComponent', () => {
	let component: ViewComponent;
	let fixture: ComponentFixture<ViewComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [HttpClientTestingModule],
				declarations: [ViewComponent],
				providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it(
		'should get dragon by id',
		fakeAsync(() => {
			component.dragonService.getDragonById = jest.fn().mockReturnValue(Promise.resolve(dragon));
			component.ngOnInit();
			tick();
			expect(component.dragonService.getDragonById).toHaveBeenCalledWith('3');
			expect(component.dragon).toBe(dragon);
		})
	);
});
