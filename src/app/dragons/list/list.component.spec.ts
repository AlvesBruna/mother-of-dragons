import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { OrderByPipe } from 'src/app/pipes/order-by/order-by.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { IDragon } from '../dragons';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	const dragonsMock: IDragon[] = [
		{
			id: '1',
			name: 'Rhaegal',
			type: 'Reptile, magical',
			createdAt: '2019-06-01T05:43:44.859Z'
		},
		{
			id: '2',
			name: 'Drogon',
			type: 'Reptile, magical',
			createdAt: '2019-06-02T05:43:44.859Z'
		},
		{
			id: '3',
			name: 'Viserion',
			type: 'Reptile, magical',
			createdAt: '2019-06-03T05:43:44.859Z'
		}
	];

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [HttpClientTestingModule],
				declarations: [ListComponent, OrderByPipe]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		component.dragons = dragonsMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render drangon data', () => {
		const nameElements = fixture.debugElement.queryAll(By.css('.dragon-name'));
		expect(nameElements.length).toBe(3);
	});

	it('should delete drangon', () => {
		component.dragonService.deleteDragon = jest.fn().mockReturnValue(Promise.resolve());
		component.getDragons = jest.fn();
		const deleteDrogonElement = fixture.debugElement.queryAll(By.css('.delete-dragon'))[0];

		deleteDrogonElement.nativeElement.click();
		expect(component.dragonService.deleteDragon).toHaveBeenCalledWith('2');
		expect(component.getDragons).toHaveBeenCalled();
	});
});
