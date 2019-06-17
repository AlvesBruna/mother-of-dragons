import { Component, OnInit } from '@angular/core';
import { DragonsService } from 'src/app/services/dragons/dragons.service';
import { ActivatedRoute } from '@angular/router';
import { IDragon } from '../dragons';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
	dragon: IDragon = {
		name: '',
		type: '',
		createdAt: ''
	};
	constructor(public dragonService: DragonsService, public route: ActivatedRoute) {}

	ngOnInit() {
		const dragonId = this.route.snapshot.paramMap.get('id');
		this.dragonService.getDragonById(dragonId).then((dragon: IDragon) => {
			this.dragon = dragon;
		});
	}
}
