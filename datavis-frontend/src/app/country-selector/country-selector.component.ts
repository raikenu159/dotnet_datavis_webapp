import { Component, OnInit, Output, EventEmitter, Input, } from '@angular/core';
import { ICountry } from '../interfaces/icountry';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})

export class CountrySelectorComponent { 
  @Input({required: true}) selectableCountries: ICountry[] = [];

  @Output() countriesSelectedEvent = new EventEmitter<number[]>();


  protected submitCountries(event: Event): void {
    // Prevent form submission and url change
    event.preventDefault();

    var form = event.target as HTMLFormElement;
    var formData = new FormData(form);
    // convert formdata to number array
    var selectedCountryIds: number[] = formData.getAll('countries').map((id) => parseInt(id as string));
    
    this.countriesSelectedEvent.emit(selectedCountryIds);
  }
}
