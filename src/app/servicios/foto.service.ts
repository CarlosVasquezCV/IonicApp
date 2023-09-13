import { Injectable } from '@angular/core';

import { Camera, CameraPhoto, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'
//import { Storage } from '@capacitor/storage'

import { Foto } from '../models/fotos.interface'
import { resolve } from 'dns';
import { read } from 'fs';

import * as fs from 'fs-extra';


@Injectable({
  providedIn: 'root'
})
export class FotoService {

  //Arreglo para almecenar fotos
  public fotos: Foto[] = [];

  constructor() { }


  public async addNewToGallery(){
    //Proceso para tomar una foto
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100

    })

    /* Foto almacenada en un Array
    if (fotoCapturada.webPath) {
      this.fotos.unshift({ 
        filepath: "foto_",
        webviewPath: fotoCapturada.webPath
      })
    } 
    */

    const savedImageFile = await this.savePicture(fotoCapturada)
    this.fotos.unshift(savedImageFile)
  }


  public async savePicture(cameraPhoto: CameraPhoto){
    //Convertir foto a formato base64
    const base64Data = await this.readAsBase64(cameraPhoto)
    //Escribir la foto en el directorio
    const fileName = new Date().getTime + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    }
  }

  

  public async readAsBase64(cameraPhoto: CameraPhoto){
    //convertir de blob a base 64
    const response = await fetch(cameraPhoto.webPath!)
    const blob = await response.blob()

    return await this.convertBlobToBase64(blob) as string

    
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}
