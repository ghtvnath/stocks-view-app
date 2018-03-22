export interface StockDetail{
	id : number,
	name : string,
	description : string,
	currentPrice : string,
	lastUpdatedTime : Date,
	strLastUpdatedTime : string,
	priceIndex : number,
	priceHistoryMap : { [key: string]: string };
};