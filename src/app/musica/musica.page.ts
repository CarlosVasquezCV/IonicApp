import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage implements OnInit {

  playlist = [
    { title: 'Canción 1', audioSrc: 'assets/audio/hola.mp3' },
    { title: 'Canción 2', audioSrc: 'assets/audio/me enamoré.mp3' },
    // Agrega más canciones según sea necesario
  ];

  actualizarProgresoInterval: any;

  audio = new Audio();
  currentIndex = 0;
  isPlaying = false;

  progress = 0;
  tiempoTranscurrido = '0:00';
  duracionTotal = '0:00';
  nombreAudioActual: string | undefined;

  cambiarProgreso() {
    const tiempo = (this.progress / 100) * this.audio.duration;
    this.audio.currentTime = tiempo;
  }

  actualizarProgreso() {
    if (this.audio.duration) {
      console.log('actualizar progreso')
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.tiempoTranscurrido = this.convertirTiempo(this.audio.currentTime);
      this.duracionTotal = this.convertirTiempo(this.audio.duration);
    }
  }

  actualizarContinuamente = () => {
    requestAnimationFrame(() => {
      this.actualizarProgreso();
      this.actualizarContinuamente();
    });
  }
  
  

  convertirTiempo(tiempo: number) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }
  
  


  reproducirCancion(index: number) {
    if (index !== this.currentIndex) {
      this.audio.pause();
      this.audio = new Audio(this.playlist[index].audioSrc);
      this.currentIndex = index;
    }
    this.audio.play();
    this.isPlaying = true;

    this.audio.addEventListener('loadedmetadata', () => {

      this.actualizarProgresoInterval = setInterval(() => {
        this.actualizarProgreso();
      }, 1000);
    });
  }

  pausarCancion() {
    this.audio.pause();
    this.isPlaying = false;
    clearInterval(this.actualizarProgresoInterval);
  }

  continuarCancion() {
    this.audio.play();
    this.isPlaying = true;
  }

  siguienteCancion() {
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.audio.src = this.playlist[this.currentIndex].audioSrc;
    this.audio.play();
    this.isPlaying = true;

    this.audio.addEventListener('loadedmetadata', () => {
      this.actualizarProgreso();
    });


  }

  anteriorCancion() {
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.audio.src = this.playlist[this.currentIndex].audioSrc;
    this.audio.play();
    this.isPlaying = true;

    this.audio.addEventListener('loadedmetadata', () => {
      this.actualizarProgreso();
    });
  }

  reiniciarCancion() {
    this.audio.currentTime = 0;
  }



  constructor() { 
    this.audio.addEventListener('timeupdate', () => {
      this.actualizarProgreso();
    });
  
    this.audio.addEventListener('ended', () => {
      this.siguienteCancion();
    });
    
  }

  

  ngOnInit() {
    
  this.audio.addEventListener('loadedmetadata', () => {
    this.actualizarProgreso();
  });

  this.audio.addEventListener('timeupdate', () => {
    this.actualizarProgreso();
  });

  // Mostrar el nombre del primer audio al iniciar
  this.nombreAudioActual = this.playlist[this.currentIndex].title;
}
  

}



