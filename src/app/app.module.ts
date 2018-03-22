import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UtilsModule } from './utils/utils.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { AppComponent } from './app.component';
import { StockViewerComponent } from './stockViewer/stockViewer.component';
import { StockEditComponent } from './stockViewer/views/stockEdit.component';

import { StockOperationsService } from './stockViewer/services/stockOperations.service';
import { StockServerService } from './stockViewer/services/stockServer.service';


import { ClosedCountPipe } from './stockViewer/pipes/closedCount.pipe';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  declarations: [
    AppComponent
    , StockViewerComponent
    , ClosedCountPipe
    , StockEditComponent
  ],
  imports: [
    BrowserModule
    , UtilsModule
    , HttpModule
    , FlexLayoutModule
    , FusionChartsModule
  ],
  providers: [
  	StockOperationsService
    , StockServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
