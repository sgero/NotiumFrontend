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
    DatePipe,
    HeaderComponent,
    FooterComponent,
    NgIf,
    FormsModule
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
    let fechaFinal = this.convertirFechaAStringFormatoYYYYMMDD(fechaFin.toISOString());
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
