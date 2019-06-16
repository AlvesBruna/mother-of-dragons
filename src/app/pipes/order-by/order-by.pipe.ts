import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
	transform(array: Array<any>, field: any): any {
		if (!Array.isArray(array)) {
			return;
		}

		array.sort(this.byField(field));
		return array;
	}

	byField = field => {
		return (a, b) => {
			if (a[field] < b[field]) {
				return -1;
			} else if (a[field] > b[field]) {
				return 1;
			} else {
				return 0;
			}
		};
	};
}
