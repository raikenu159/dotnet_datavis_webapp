import { Component, inject, output, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { ICountry } from './interfaces/icountry';
import { ICrop } from './interfaces/icrop';
import { ICropYield } from './interfaces/icrop-yield';

import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { CropSelectorComponent } from './crop-selector/crop-selector.component';
import { LineChartComponent } from './chart/line/line.chart.component';

import { ChartDataHandlerService } from './services/chart-data-handler.service';
import { DataRequestService } from './services/data-request.service';

import { ChartData } from 'chart.js';



@Component({
  selector: 'app-root',
  imports: [CountrySelectorComponent, LineChartComponent, CropSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'datavis-frontend';

  // service depencdency injections
  private chartDataHandlerService:ChartDataHandlerService = inject(ChartDataHandlerService);
  private dataRequestService: DataRequestService = inject(DataRequestService)

  // Input variables for child selector components
  protected selectableCountries!: ICountry[]; // for CountrySelector, initialized in ngOnInit()
  protected selectableCrops!: ICrop[]; // input for CropSelector, initialized in ngOnInit()

  private selectedCountryIds!: number[];
  private selectedCropId!: number;
    // For child chart components
  protected  lineChartData!: ChartData;// input for line.chart.component for canvas


  ngOnInit(): void {
    // setup data for selector components
    this.selectableCountries = this.GetSelectableCountries();
    this.selectableCrops = this.GetSelectableCrops();
  }

  /**
   * Fetches all countries from the backend and stores them in the
   * selectableCountries variable. This is called in ngOnInit.
   * 
   * @returns an array of ICountry objects
   */
  protected GetSelectableCountries(): ICountry[]{
    let selectableCountries: ICountry[] = [];
    try{
      let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
      countriesObservable.subscribe(
        (data: ICountry[]) => {
          selectableCountries = data;
        }
      );
    } catch (error) {
      console.error("Error when initializing selectableCountries" + error);
    }
    return selectableCountries;
  }

  /**
   * Fetches all available crops from the API and returns them as an array of ICrop.
   * If an error occurs, logs the error to the console and returns an empty array.
   * @returns An array of ICrop objects.
   */
  protected GetSelectableCrops(): ICrop[] {
    let selectableCrops: ICrop[] = [];

    try {
      let cropsObservable: Observable<ICrop[]> = this.dataRequestService.GetCrops();
      cropsObservable.subscribe (
        (crops: ICrop[]) => selectableCrops = crops
      
      );
    } catch (error) {
      console.error("Error when initializing selectableCrops: ", error)
    }

    return selectableCrops;
  }

  // method has to set the cropyielddata itself it seems, because of of the asynchronous nature of subscribing to an Observable
  protected SetLineChartCropYieldData(countryIds: number[], cropId: number): void {
    // request crop yield data from api
    var cropYieldsObservable: Observable<ICropYield[]> = this.dataRequestService.GetCropYieldsByCountriesAndCrop(countryIds, cropId);
    
    // update chart data with new data
    cropYieldsObservable.subscribe((cropYields: ICropYield[]) => {
      this.lineChartData = this.chartDataHandlerService.GetLineChartDataFromCropYield(cropYields);
    });
  }

  protected OnCountriesSelected(countryIds: number[]): void {
    this.SetLineChartCropYieldData(countryIds, this.selectedCropId);
  }

  protected OnCropSelected(cropId: number|null): void {
    // console.log("OnCropSelected called and retrieved value was: " + cropId);
    this.SetLineChartCropYieldData(this.selectedCountryIds, this.selectedCropId);
  }


}
