import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
 contrasena: string = '';

  constructor(private router: Router, private alertController: AlertController) { }


  iniciarSesion(){
    const usuarioRegistrado = localStorage.getItem('usuario');
    const contrasenaRegistrada = localStorage.getItem('contrasena');

    if (this.usuario === usuarioRegistrado && this.contrasena === contrasenaRegistrada){
      this.router.navigate(['/inicio']);
    } else {
      this.mostrarAlerta('Error', 'Credenciales incorrectas');
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
