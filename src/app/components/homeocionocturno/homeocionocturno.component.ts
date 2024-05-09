import { Component, OnInit } from '@angular/core';
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {EventoService} from "../../services/evento.service";
import {Evento} from "../../models/Evento";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-homeocionocturno',
  templateUrl: './homeocionocturno.component.html',
  styleUrls: ['./homeocionocturno.component.scss'],
  imports: [
    FooterocionocturnoComponent,
    HeaderocionocturnoComponent,
    NgForOf,
    IonicModule,
    HeaderComponent,
    FooterComponent,
    NgIf,
    FormsModule,
    DatePipe
  ],
  standalone: true
})
export class HomeocionocturnoComponent  implements OnInit {

  eventosActivos: Evento[] = [];
  eventosEntreFechas: Evento[] = [];
  esCliente?: boolean;
  fecha: Date = new Date();
  fechaSeleccionada?: Date ;

  constructor(private ocioService : EventoService) { }

  ngOnInit() {
    this.getEventos();
  }
  getEventos(){
    this.ocioService.getActivos().subscribe({
      next: value => {
        this.eventosActivos = value.object as Evento[];
      },
      error: e => {
        console.error(e);
      }
    })
  }

  getEventosEntreFechas(fecha:Date){
    let fechaInicio = this.convertirFechaAStringFormatoYYYYMMDD(fecha.toString());
    let fechaFin = this.obtenerSiguienteDia(fechaInicio);
    let fechaFinal = this.formatDate(fechaFin);
    const params = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFinal,
    };
    this.ocioService.entreDosFechas(params).subscribe({
      next: value => {
        this.eventosEntreFechas = value.object as Evento[];
      },
      error: e => {
        console.error(e);
      }
    })
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    return `${year}/${month}/${day}`;
  }
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  obtenerSiguienteDia(fecha: string): Date {
    const fechaSiguiente = new Date(fecha);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

    return fechaSiguiente;
  }

  convertirFechaAStringFormatoYYYYMMDD(fecha:string): string{
    fecha = fecha.substring(0, 10);
    fecha = fecha.replace(/-/g, '/');

    return fecha;
  }

}
