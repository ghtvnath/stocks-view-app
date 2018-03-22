import { StockDetail } from '../models/StockDetail';

export class StockOperationsService{
	createNew(stockName : string, 
		stockDesc : string,
		stockPrice) : StockDetail {
		let newStock : StockDetail = {
			id : 0,
			name : stockName,
			description : stockDesc,
			currentPrice : stockPrice,
			lastUpdatedTime : new Date(),
			strLastUpdatedTime : "",
			priceIndex : 0,
			priceHistoryMap : {}
		};
		return newStock;
	}

}