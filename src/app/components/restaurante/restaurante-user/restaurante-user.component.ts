import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {PruebaPage} from "../prueba/prueba.page";

@Component({
  selector: 'app-restaurante-user',
  templateUrl: './restaurante-user.component.html',
  styleUrls: ['./restaurante-user.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})



export class RestauranteUserComponent  implements OnInit {


  @Input() items='';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

 async abrirModalReserva(){

   /*const modalReserva = await this.modalCtrl.create({
    component: HacerReservaComponent,
  })*/
  }
}
