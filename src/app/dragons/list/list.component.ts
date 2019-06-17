import { Component, OnInit, ɵConsole } from '@angular/core';
import { DragonsService } from '../../services/dragons/dragons.service';
import { IDragon } from '../dragons';
@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	constructor(public dragonService: DragonsService) {}
	dragons: IDragon[];

	ngOnInit() {
		this.getDragons();
	}

	getDragons = () => {
		this.dragonService.getDragons().then((dragons: IDragon[]) => {
			this.dragons = dragons;
		});
	};

	deleteDragon = (id, event) => {
		event.stopPropagation();
		this.dragonService.deleteDragon(id).then(() => this.getDragons());
	};
}
