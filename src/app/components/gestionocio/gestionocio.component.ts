import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {IonicModule, IonModal} from "@ionic/angular";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ActivatedRoute} from "@angular/router";
import {Evento} from "../../models/Evento";
import {EventoService} from "../../services/evento.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RppService} from "../../services/rpp.service";
import {Rpp} from "../../models/Rpp";
import {ListaOcio} from "../../models/ListaOcio";
import {ListaOcioService} from "../../services/listaOcio.service";
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import {Direccion} from "../../models/Direccion";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-gestionocio',
  templateUrl: './gestionocio.component.html',
  styleUrls: ['./gestionocio.component.scss'],
  imports: [
    HeaderocionocturnoComponent,
    FooterocionocturnoComponent,
    IonicModule,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
  ],
  standalone: true
})
export class GestionocioComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  message = 'Rpp creado con éxito';

  eventosInfo: string = 'eventosInfo';
  ocio: OcioNocturno = new OcioNocturno();
  eventos: Evento[] = [];
  rpps: Rpp[] = [];
  rppDeleted: Rpp = new Rpp();
  newRpp: Rpp = new Rpp();
  direccion: Direccion = new Direccion();
  usuario: Usuario = new Usuario();
  listas: ListaOcio[] = [];
  constructor(
    private ocioNocturnoService : OcionocturnoService,
    private eventoService : EventoService,
    private rppService : RppService,
    private listaService : ListaOcioService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.getOcio()
  }


  getOcio(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.ocioNocturnoService.ocioPorId(ocioID).subscribe({
          next: value => {
            this.ocio = value as OcioNocturno;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getEventos(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.eventoService.getAllByOcio(ocioID).subscribe({
          next: value => {
            this.eventos = value.object as Evento[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getRpps(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.rppService.rppsByOcio(ocioID).subscribe({
          next: value => {
            this.rpps = value as Rpp[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getListas(){
    this.route.params.subscribe(params => {
      const rppID = +params['id'];
      if (rppID) {
        this.listaService.getByRppId(rppID).subscribe({
          next: value => {
            this.listas = value as ListaOcio[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  deleteRpp(){
    this.route.params.subscribe(params => {
      const rppID = +params['id'];
      if (rppID) {
        this.rppService.eliminarRpp(rppID).subscribe({
          next: value => {
            this.rppDeleted = value as Rpp;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }
  Eventos() {
    this.eventosInfo = 'eventosInfo';
    this.getEventos()
  }

  Staff() {
    this.eventosInfo = 'staff';
    this.getRpps()
  }

  Galeria() {
    this.eventosInfo = 'galeria';
  }

  RegistrarRpp() {
    this.rppService.guardarRpp(this.newRpp).subscribe({
      next: value => {
       // this.newRpp.direccionDTO = this.direccion;
        // this.newRpp.userDTO = this.usuario;
        this.newRpp = value as Rpp;
        console.log(value);
      },
      error: e => {
        console.error("no funciona",e);
      }
    })
  }

  onWillDismiss($event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Rpp>>;
    if (ev.detail.role === 'confirmar') {
      this.message;
      this.RegistrarRpp()
    }
  }


  cancelar() {
    this.modal.dismiss(null, 'cancelar')
  }

  confirmar() {
    this.modal.dismiss(this.newRpp, 'confirmar')
  }
}




