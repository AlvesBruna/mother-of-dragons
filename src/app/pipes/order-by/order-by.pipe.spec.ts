import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
	it('create an instance', () => {
		const pipe = new OrderByPipe();
		expect(pipe).toBeTruthy();
	});

	it('should order by field', () => {
		const pipe = new OrderByPipe();
		const array = [
			{
				id: '1',
				name: 'Rhaegal'
			},
			{
				id: '2',
				name: 'Drogon'
			},
			{
				id: '3',
				name: 'Viserion'
			}
		];

		pipe.transform(array, 'name');

		expect(array[0].id).toBe('2');
		expect(array[1].id).toBe('1');
		expect(array[2].id).toBe('3');
	});
});
