import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorToastService {
	toast$ = new EventEmitter<boolean | string>();
	constructor() {}

	show(error) {
		this.toast$.next(error.message || 'Ops! An unexpected error has occurred.');
		this.removeToastAfter(5000);
	}

	removeToastAfter(time) {
		setTimeout(() => {
			this.toast$.emit(false);
		}, time);
	}
}
