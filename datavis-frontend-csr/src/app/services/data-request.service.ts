import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/icountry';
import { Observable } from 'rxjs';
import { ICropYield } from '../interfaces/icrop-yield';
import { ICrop } from '../interfaces/icrop';
import { ICountryYield } from '../interfaces/icountry-yield';

@Injectable({
  providedIn: 'root'
})

export class DataRequestService {

  readonly ROOT_URL = "http://localhost:5065/crop-api/"
  
  constructor(private http: HttpClient) { }

  public GetCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.ROOT_URL + "countries");
  }

  public GetCrops(): Observable<ICrop[]> {
    return this.http.get<ICrop[]>(this.ROOT_URL + "crops");
  }

  public GetCropYieldsByCountriesAndCrop(countryIds: number[], cropId: number): Observable<ICropYield[]> {
    let requestUrl: string = this.GenerateCropYieldRequestByCountriesAndCrop(countryIds, cropId);
    return this.http.get<ICropYield[]>(requestUrl);
  }

  public GetMinYearValue(){
    let requestUrl: string = this.ROOT_URL + "years-min"
    return this.http.get<number>(requestUrl);
  }

  public GetMaxYearValue(){
    let requestUrl: string = this.ROOT_URL + "years-max"
    return this.http.get<number>(requestUrl);
  }

  public GetCountryYields(yearStart: number, yearEnd: number, cropId: number): Observable<ICountryYield[]>{
    let requestUrl: string = this.ROOT_URL + "cropyields/crop/yearrange?"
    // add yearStart to request url
    requestUrl += "yearStart=" + yearStart + "&";

    // add yearEnd to request url
    requestUrl += "yearEnd=" + yearEnd + "&";
    // add cropId to request url
    requestUrl += "cropId=" + cropId;

    return this.http.get<ICountryYield[]>(requestUrl);
  }

  private GenerateCropYieldRequestByCountriesAndCrop(countryIds: number[], cropId: number): string {
    var requestUrl: string = this.ROOT_URL + "cropyields/countries/crop?"
    
    for (let countryId of countryIds){
      requestUrl += "countryIds=" + countryId + "&";
    }

    requestUrl += "cropId=" + cropId;

    return requestUrl;
  }

}
