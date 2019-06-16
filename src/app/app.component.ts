import { Component, OnInit } from '@angular/core';
import { ErrorToastService } from './services/error-toast/error-toast.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	errorToast;

	constructor(public toastService: ErrorToastService) {}

	ngOnInit() {
		this.toastService.toast$.subscribe(value => {
			this.errorToast = value;
		});
	}
}
