import { Component } from '@angular/core';
import { FotoService } from '../servicios/foto.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public fotoService: FotoService) {}

  addPhotoToGallery(){
    this.fotoService.addNewToGallery()
  }

}
