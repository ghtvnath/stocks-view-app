import { Injectable } from '@angular/core';
import { StockDetail } from '../models/StockDetail';
import { StockOperationsService } from './stockOperations.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import'rxjs/add/operator/map';

@Injectable()
export class StockServerService{
	private baseUrl  = 'http://localhost:8080/api/stocks';

	constructor(private stockOperations : StockOperationsService, private http : Http){

	}

	getAll() : Observable<StockDetail[]>{
		return this.http
			.get(this.baseUrl)
			.map(response => response.json());
	}

	addNew(stockName : string, stockDesc : string, stockPrice : string) 
			: Observable<StockDetail> {
		let stockDetail = this.stockOperations.createNew(stockName, 
			stockDesc, stockPrice);
		return this.http
			.post(this.baseUrl, stockDetail)
			.map(response => response.json());
	}

	getStockDetails(stockToDisplay : StockDetail) : Observable<StockDetail> {
		return this.http
			.get(`${this.baseUrl}/${stockToDisplay.id}`)
			.map(response => response.json());
	}

}