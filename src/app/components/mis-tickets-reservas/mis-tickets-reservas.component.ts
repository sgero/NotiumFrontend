import { Component, OnInit } from '@angular/core';
import {Reserva} from "../../models/Reserva";
import {EntradaOcio} from "../../models/EntradaOcio";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-mis-tickets-reservas',
  templateUrl: './mis-tickets-reservas.component.html',
  styleUrls: ['./mis-tickets-reservas.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class MisTicketsReservasComponent  implements OnInit {

  reservas: Reserva[] = [];

  entradas: EntradaOcio[] = [];

  constructor() { }

  ngOnInit() {
  }

}
