import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDragon } from 'src/app/dragons/dragons';
import { ErrorToastService } from '../error-toast/error-toast.service';

@Injectable({
	providedIn: 'root'
})
export class DragonsService {
	constructor(private http: HttpClient, public errorToast: ErrorToastService) {}
	baseUrl = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1';

	getDragons() {
		const url = `${this.baseUrl}/dragon`;
		return this.http
			.get(url)
			.toPromise()
			.catch(this.emitError);
	}

	getDragonById(id) {
		const url = `${this.baseUrl}/dragon/${id}`;
		return this.http
			.get(url)
			.toPromise()
			.catch(this.emitError);
	}

	createDragon(dragon) {
		const url = `${this.baseUrl}/dragon`;
		return this.http
			.post(url, dragon)
			.toPromise()
			.catch(this.emitError);
	}

	deleteDragon(id) {
		const url = `${this.baseUrl}/dragon/${id}`;
		return this.http
			.delete(url)
			.toPromise()
			.catch(this.emitError);
	}

	emitError(error) {
		this.errorToast.show(error);
	}
}
