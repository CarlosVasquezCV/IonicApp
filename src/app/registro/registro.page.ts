import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';




  constructor(private router: Router, private alertController: AlertController) { }

  
  registrar(){
    if (this.contrasena === this.confirmarContrasena){
      localStorage.setItem('usuario', this.usuario);
      localStorage.setItem('contrasena', this.contrasena);
      this.mostrarAlerta('Éxito', 'El registro se ha realizado con éxito');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Redirección después de 1 segundo (puedes ajustar el tiempo)
    } else {
      this.mostrarAlerta('Error', 'La contraseña y la confirmación no coinciden');
    }
  }


  

  async mostrarAlerta(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


  ngOnInit() {
  }

}
