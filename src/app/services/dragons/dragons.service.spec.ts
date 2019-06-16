import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DragonsService } from './dragons.service';
import { IDragon } from 'src/app/dragons/dragons';
import { ErrorToastService } from '../error-toast/error-toast.service';
import { HttpErrorResponse } from '@angular/common/http';

class ErrorToastServiceMock {
	show = jest.fn();
}
const errorEvent = new ErrorEvent('ERROR');
describe('DragonsService', () => {
	let injector: TestBed;
	let httpMock: HttpTestingController;

	const dragonsList: IDragon[] = [
		{
			id: '1',
			createdAt: '2019-06-02T12:49:42.760Z',
			name: 'Dragon name 1',
			type: 'Type 1'
		},
		{
			id: '2',
			createdAt: '2019-06-02T12:49:42.760Z',
			name: 'Dragon name 2',
			type: 'Type 2'
		},
		{
			id: '3',
			createdAt: '2019-06-02T12:49:42.760Z',
			name: 'Dragon name 3',
			type: 'Type 3'
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [DragonsService, { provide: ErrorToastService, useClass: ErrorToastServiceMock }]
		});
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		const service: DragonsService = TestBed.get(DragonsService);
		expect(service).toBeTruthy();
	});

	describe('getDragons', () => {
		it('should get dragons list', () => {
			const service: DragonsService = TestBed.get(DragonsService);
			service.getDragons().then((dragons: IDragon) => {
				expect(dragons).toEqual(dragonsList);
			});

			const url = `${service.baseUrl}/dragon`;
			const req = httpMock.expectOne(url);

			expect(req.request.method).toBe('GET');
			req.flush(dragonsList);
		});

		it('should invoke emit error function when API returns a error', () => {
			const service: DragonsService = TestBed.get(DragonsService);
			service.emitError = jest.fn();
			service.getDragons().catch(err => {
				expect(service.errorToast.show).toHaveBeenCalledWith(err);
			});

			const url = `${service.baseUrl}/dragon`;
			const req = httpMock.expectOne(url);
			req.error(errorEvent);

			expect(req.request.method).toBe('GET');
		});
	});

	describe('getDragonById', () => {
		it("should get dragon's details", () => {
			const id = '1';
			const service: DragonsService = TestBed.get(DragonsService);
			service.getDragonById(id).then(dragon => {
				expect(dragon).toEqual(dragonsList[0]);
			});

			const url = `${service.baseUrl}/dragon/${id}`;
			const req = httpMock.expectOne(url);

			expect(req.request.method).toBe('GET');
			req.flush(dragonsList.find(d => d.id === id));
		});

		it('should invoke emit error function when API returns a error', () => {
			const id = '1';
			const service: DragonsService = TestBed.get(DragonsService);
			service.emitError = jest.fn();
			service.getDragonById(id).catch(err => {
				expect(service.errorToast.show).toHaveBeenCalledWith(err);
			});

			const url = `${service.baseUrl}/dragon/${id}`;
			const req = httpMock.expectOne(url);
			req.error(errorEvent);

			expect(req.request.method).toBe('GET');
		});
	});

	describe('createDragon', () => {
		it('should create dragon', () => {
			const dragon = { name: 'Test name', type: 'Test type' };
			const service: DragonsService = TestBed.get(DragonsService);
			service.createDragon(dragon).then(dragon => {
				expect(dragon).toEqual(dragon);
			});

			const url = `${service.baseUrl}/dragon`;
			const req = httpMock.expectOne(url);

			expect(req.request.method).toBe('POST');
			req.flush(dragon);
		});

		it('should invoke emit error function when API returns a error', () => {
			const dragon = { name: 'Test name', type: 'Test type' };
			const service: DragonsService = TestBed.get(DragonsService);
			service.emitError = jest.fn();
			service.createDragon(dragon).catch(err => {
				expect(service.errorToast.show).toHaveBeenCalledWith(err);
			});

			const url = `${service.baseUrl}/dragon`;
			const req = httpMock.expectOne(url);
			req.error(errorEvent);

			expect(req.request.method).toBe('POST');
		});
	});

	describe('deleteDragon', () => {
		it('should delete dragon', () => {
			const id = '1';
			const service: DragonsService = TestBed.get(DragonsService);
			service.deleteDragon(id).then(dragon => {
				expect(dragon).toEqual(dragonsList[0]);
			});

			const url = `${service.baseUrl}/dragon/${id}`;
			const req = httpMock.expectOne(url);

			expect(req.request.method).toBe('DELETE');
			req.flush(dragonsList[0]);
		});

		it('should invoke emit error function when API returns a error', () => {
			const id = '1';
			const service: DragonsService = TestBed.get(DragonsService);
			service.emitError = jest.fn();
			service.deleteDragon(id).catch(err => {
				expect(service.errorToast.show).toHaveBeenCalledWith(err);
			});

			const url = `${service.baseUrl}/dragon/${id}`;
			const req = httpMock.expectOne(url);
			req.error(errorEvent);

			expect(req.request.method).toBe('DELETE');
		});
	});
});
