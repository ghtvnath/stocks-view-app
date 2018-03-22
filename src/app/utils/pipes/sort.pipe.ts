import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
	(item1 : any, item2 : any) : number;
}

@Pipe({
	name : 'sort',
	pure : true
})
export class SortPipe implements PipeTransform{
	private getComparer(attrName) : Comparer{
		return function(item1 : any, item2 : any) : number {
			if (item1[attrName] < item2[attrName]) return -1;
			if (item1[attrName] > item2[attrName]) return 1;
			return 0;
		}
	}
	private getDescendingComparer(comparer : Comparer ) : Comparer{
		return function(item1 : any, item2 : any) : number {
			return comparer(item1, item2) * -1;
		}
	}
	transform(data : any[], attrName : string, isDecending : boolean = false) : any[]{
		//console.log('Sort transform triggered');
		if (!data || !attrName) return data;
		let comparer = this.getComparer(attrName);
		if (isDecending)
			comparer = this.getDescendingComparer(comparer);
		return data.sort(comparer);
	}
}