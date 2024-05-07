import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {PruebaPage} from "../prueba/prueba.page";
import {restaurant} from "ionicons/icons";
import {HacerValoracionComponent} from "../hacer-valoracion/hacer-valoracion.component";
import {HacerReservaComponent} from "../hacer-reserva/hacer-reserva.component";

@Component({
  selector: 'app-restaurante-user',
  templateUrl: './restaurante-user.component.html',
  styleUrls: ['./restaurante-user.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ],
  standalone: true
})



export class RestauranteUserComponent  implements OnInit {

  info: string = 'info';
  estilo1_info: boolean = false;
  estilo2_info: boolean = true;
  estilo1_carta: boolean = true;
  estilo2_carta: boolean = false;

  constructor(private modalController: ModalController) {
  }

  //Funciones modales
  async modalValoracion(){
    const modalValoracion = await this.modalController.create({
      component: HacerValoracionComponent
    });
    return await modalValoracion.present();
  }

  dismissValoracion(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }

  async modalReserva(){
    const modalReserva = await this.modalController.create({
      component: HacerReservaComponent
    });
    return await modalReserva.present();
  }

  dismissReserva(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }



  ngOnInit() {}

  Info(){
    this.estilo2_info = true;
    this.estilo2_carta = false;
    this.info = 'info';

  }

  Carta(){
    this.estilo1_info = true;
    this.estilo2_info = false;

    this.estilo1_carta = false;
    this.estilo2_carta = true
    this.info = 'Carta';

  }

  protected readonly restaurant = restaurant;
}
