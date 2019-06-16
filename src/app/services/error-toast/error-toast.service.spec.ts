import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ErrorToastService } from './error-toast.service';

describe('ErrorToastService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ErrorToastService = TestBed.get(ErrorToastService);
		expect(service).toBeTruthy();
	});

	it('should emit error message', () => {
		const service: ErrorToastService = TestBed.get(ErrorToastService);
		let errorMessage;
		service.toast$.subscribe(message => {
			errorMessage = message;
		});

		service.show({ message: 'Error message' });
		expect(errorMessage).toEqual('Error message');
	});

	it('should return default error message', () => {
		const service: ErrorToastService = TestBed.get(ErrorToastService);
		let errorMessage;
		service.toast$.subscribe(message => {
			errorMessage = message;
		});

		service.show({});
		expect(errorMessage).toEqual('Ops! An unexpected error has occurred.');
	});
});
