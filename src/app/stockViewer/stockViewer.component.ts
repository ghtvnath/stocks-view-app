import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { StockDetail } from './models/StockDetail';
import { StockHistory } from './models/StockHistory';
import { StockServerService } from './services/stockServer.service';
import * as FusionCharts from 'fusioncharts';

@Component({
	selector : 'app-stock-viewer',
	templateUrl : 'stockViewer.component.html'
})
export class StockViewerComponent implements OnInit{
	
	stocks : StockDetail[] = [];
	stockToDisplay : StockDetail= {
		id : 0,
		name : "",
		description : "",
		currentPrice : "",
		lastUpdatedTime : new Date(),
		strLastUpdatedTime : "",
		priceIndex : 0,
		priceHistoryMap : {}
	};

	sortStockBy : string = 'name';
	sortStockDescending : boolean = false;
	showHistoryVar : boolean = true;

	width = 600;
    height = 400;
    type = 'line';
    dataFormat = 'json';
	dataMap : StockHistory[];
	
	dataSource = {
		"chart": {
			"caption": "Price History",
			"subCaption": "Trends in recent times",
			"numberprefix": "$",
			"theme": "fint",
			"xAxisName": "Date",
			"yAxisName": "Price"
		},
		"data": this.dataMap,
		"trendlines": [
			{
				"line": [
					{
						"startvalue": "",
						"color": "#1aaf5d",
						"displayvalue": "Current{br}Price",
						"valueOnRight" : "1",
						"thickness" : "2"
					}
				]
			}
		]
	}
	
	
	ngOnInit(){
		this.stockServer
			.getAll()
			.subscribe(stocks => this.stocks = stocks);
	}

	constructor(private stockServer : StockServerService,
					private cd : ChangeDetectorRef){
		
	}
	
	onNewStock(stockDetail : StockDetail){
		let updated = false;
		for(let index = 0, count = this.stocks.length; index < count; index++){
			if (this.stocks[index].id === stockDetail.id){
				this.stocks[index] = stockDetail;
				updated = true;
			}
		}
		if (!updated){
			this.stocks = [...this.stocks, stockDetail];
		}
		this.updateStockDisplay(stockDetail,this.dataSource);
	}

	onStockNameClick(stockDetail : StockDetail){
		this.stockToDisplay = stockDetail;
		this.stockServer.getStockDetails(stockDetail)
			.subscribe(stockToDisplay => this.updateStockDisplay(stockDetail, this.dataSource));
		
			
	
	}

	updateStockDisplay(stockDetail, dataSource) {
		if (stockDetail != undefined){
				dataSource.chart.caption = stockDetail.name +" Price History";
				let dataMap =  [];
				// add history details to be displayed in chart
				Object.keys(stockDetail.priceHistoryMap).forEach(key => {
					let data : StockHistory = {
						label : key,
						value : stockDetail.priceHistoryMap[key]
					};
					dataMap.push(data);
				});
				
				// add current price too to be displayed in chart
				let data : StockHistory = {
					label : stockDetail.strLastUpdatedTime,
					value : stockDetail.currentPrice
				};
				dataMap.push(data);

				dataSource.data = dataMap;
				dataSource.trendlines[0].line[0].startvalue = stockDetail.currentPrice; 
		}
	}




}