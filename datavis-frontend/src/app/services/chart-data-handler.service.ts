import { Injectable, output } from '@angular/core';
import { ICropYield } from '../interfaces/icrop-yield';
import { Chart, ChartConfiguration, ChartData, ChartDataset } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartDataHandlerService {

  constructor() { }

  public EXAMPLE_DATA: ICropYield[] = 
  [
    {
      "id": 110,
      "country": "Africa (FAO)",
      "crop": "almond",
      "year": 1961,
      "value": 0.2279
    },
    {
      "id": 172,
      "country": "Algeria",
      "crop": "almond",
      "year": 1961,
      "value": 0.4511
    },
    {
      "id": 111,
      "country": "Africa (FAO)",
      "crop": "almond",
      "year": 1962,
      "value": 0.2875
    },
    {
      "id": 173,
      "country": "Algeria",
      "crop": "almond",
      "year": 1962,
      "value": 0.4511
    }
  ];


  public GetLineChartDataFromCropYield(cropYieldData: ICropYield[]): ChartData<'line'>{
    let outputData: ChartData<'line'> = 
    {
      labels: [], // ICropYield.year unique sorted
      datasets: 
      [
        // { ChartDataset
        //   label: "",  // ICropYield.country
        //   data: [] , // ICropYield.values
        // }
      ] 
    }

    let uniqueYears: number[] = this.GetSortedUniqueYearsFromCropYields(cropYieldData);
    outputData.labels = uniqueYears;

    let uniqueCountries: string[] = this.GetSortedUniqueCountriesFromCropYields(cropYieldData);

    for (let country of uniqueCountries){

      let countryCropYieldDataset: ChartDatase<'lt = this.GetCropYieldValuesByCountry(cropYieldData, country);
      outputData.datasets.push(
        countryCropYieldDataset
      );
    }

    return outputData;
  }

  private GetSortedUniqueYearsFromCropYields(cropYieldData: ICropYield[]): number[]{
    let allYears: number[] = cropYieldData.map((cropYield) => cropYield.year);
    let uniqueYears: number[] = Array.from(new Set(allYears));

    return uniqueYears.sort();
  }

  private GetSortedUniqueCountriesFromCropYields(cropYieldData: ICropYield[]): string[]{
    let allCountries: string[] = cropYieldData.map((cropYield) => cropYield.country);
    let uniqueCountries: string[] = Array.from(new Set(allCountries));

    return uniqueCountries.sort();
  }


  private GetCropYieldValuesByCountry(cropYieldData: ICropYield[], country: string): ChartDataset{
    let output: ChartDataset =
    {
      label: country,
      data: []
    }

    let countryCropYields: ICropYield[] = cropYieldData.filter((cropYield) => cropYield.country === country);
    let countryCropYieldValues: number[] = countryCropYields.map((cropYield) => cropYield.value);
    output.data = countryCropYieldValues;

    return output;
  }
    
}