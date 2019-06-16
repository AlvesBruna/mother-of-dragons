import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDragon } from '../dragons';
import { DragonsService } from 'src/app/services/dragons/dragons.service';
import { ErrorToastService } from 'src/app/services/error-toast/error-toast.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
	dragonForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		type: new FormControl('', [Validators.required])
	});

	constructor(public dragonService: DragonsService) {}

	isFormInvalid() {
		const nameError = this.dragonForm.get('name').errors;
		const typeError = this.dragonForm.get('type').errors;

		if (!nameError && !typeError) return false;

		this.dragonForm.setErrors({
			message: "You missed a spot! Don't forget to provide a name and type for your dragon."
		});
		return true;
	}
	createDragon() {
		if (this.isFormInvalid()) return;
		const { name, type } = this.dragonForm.controls;
		const dragon: IDragon = {
			name: name.value,
			type: type.value,
			createdAt: new Date().toISOString()
		};

		this.dragonService.createDragon(dragon).then(result => {
			this.dragonForm.reset();
			alert('Dragon created successfully');
		});
	}

	ngOnInit() {}
}
