import { Component, OnInit } from '@angular/core';
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {EventoService} from "../../services/evento.service";
import {Evento} from "../../models/Evento";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule} from "@angular/forms";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {MatButton} from "@angular/material/button";

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
    DatePipe,
    RouterLink,
    MatButton
  ],
  standalone: true,
  providers: [DatePipe]
})
export class HomeocionocturnoComponent  implements OnInit {

  eventosActivos: Evento[] = [];
  eventosEntreFechas: Evento[] = [];
  ocios: OcioNocturno[] = [];
  esCliente?: boolean;
  fecha: Date = new Date();
  fechaSeleccionada?: Date ;
  noHayEventos?: boolean;
  items:Evento[] = [];
  finalPaginado:boolean = false;
  fechaActual = new Date().toString();
  ver= true;


  constructor(private ocioService : EventoService,
              private ocioNocturnoService : OcionocturnoService,
              private datePipe : DatePipe,
              private usuarioService : UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.getUsuario();
    this.getEventos(5,0);
    this.getOcios();
    this.fechaActual = <string>this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd')
  }
  getEventos(numElem:number, numPag:number){
    const params = {
      numElem: numElem,
      numPag: numPag,
    };
    this.ocioService.getActivos(params).subscribe({
      next: value => {
        this.eventosActivos = value.object as Evento[];
        if (this.eventosActivos.length != 0){
          this.eventosActivos.forEach(e => this.items.push(e));
        }else {
          this.finalPaginado = true;
        }
      },
      error: e => {
        console.error(e);
      }
    })
  }

  getOcios(){
    this.ocioNocturnoService.listarOcioNocturno().subscribe({
      next: value => {
        this.ocios = value as OcioNocturno[] ;
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
        this.noHayEventos = this.eventosEntreFechas.length == 0;
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
  private generateItems() {
    const count = this.items.length ;
    this.getEventos(5,  count);
  }

  onScroll(event:any) {
    const element = event.target;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (atBottom) {
      this.generateItems();

    }
  }

  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        this.getDTO(value);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getDTO(usuario: any) {
    if (usuario.rol == "CLIENTE") {
      this.esCliente = true;
    } else if (usuario.rol == "OCIONOCTURNO"){
      this.esCliente = false;
    }
    else {
      this.router.navigate(["notium/error"])
    }
  }

  verEventos(b: boolean) {
    this.ver = b;
  }
}
