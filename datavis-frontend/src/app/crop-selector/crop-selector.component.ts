import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICrop } from '../interfaces/icrop';

@Component({
  selector: 'app-crop-selector',
  imports: [],
  templateUrl: './crop-selector.component.html',
  styleUrl: './crop-selector.component.css'
})
export class CropSelectorComponent {
  @Input() selectableCrops!: ICrop[];
  
  @Output() cropSelectedEvent = new EventEmitter<number|null>();

  protected submitCrop(event: Event): void {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    // console.log("submitCrop called, formdata: ");
    // console.log(formData.get("crops"), typeof(formData.get("crops")));

    let selectedCropId: any = formData.get("crops");
    this.cropSelectedEvent.emit(selectedCropId);
  }

}
