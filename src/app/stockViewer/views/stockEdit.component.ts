import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StockDetail } from '../models/StockDetail';
import { StockServerService } from '../services/stockServer.service';

@Component({
	selector : 'app-stock-edit',
	template : `
		<section class="edit">
		 	<form onSubmit="return false;">
			 	<label for="">Stock Name :</label>
				 <input type="text" #txtStockName  value={{stockEditDetail.name}}/>
				<label for="">Description :</label>
				 <input type="text" #txtStockDesc value={{stockEditDetail.description}}/>
				<label for="">Current Price :</label>
			 	 <input type="text"  #txtStockCurrentPrice value={{stockEditDetail.currentPrice}}/>
				 <input type="submit" #btnSubmit value="Create or Update" 
				 (click)="onCreateNewClick(txtStockName.value,
					txtStockDesc.value, txtStockCurrentPrice.value)"
			 	>
			 </form>
		 </section>
	`,
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class StockEditComponent{

	@Output()
	create : EventEmitter<StockDetail> = new EventEmitter<StockDetail>();

	@Input()
	stockEditDetail : StockDetail = {
		id : 0,
		name : "",
		description : "",
		currentPrice : "",
		lastUpdatedTime : new Date(),
		strLastUpdatedTime : "",
		priceIndex : 0,
		priceHistoryMap : {}
	};


	constructor(private stockServer : StockServerService){
		
	}
	
	onCreateNewClick(stockName : string,
		stockDesc : string, stockPrice : string){
		this.stockServer
			.addNew(stockName, stockDesc, stockPrice)
			.subscribe(newStock => this.create.emit(newStock));
	}
}