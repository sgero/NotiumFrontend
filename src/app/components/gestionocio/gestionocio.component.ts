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
import {FormsModule} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {Direccion} from "../../models/Direccion";
import {Usuario} from "../../models/Usuario";
import {CartaocioComponent} from "../cartaocio/cartaocio.component";
import {CartaOcio} from "../../models/CartaOcio";
import {CartaOcioService} from "../../services/cartaOcio.service";

@Component({
  selector: 'app-gestionocio',
  templateUrl: './gestionocio.component.html',
  styleUrls: ['./gestionocio.component.scss'],
  imports: [
    HeaderocionocturnoComponent,
    FooterocionocturnoComponent,
    CartaocioComponent,
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
  eventosInfo: string = 'eventosInfo';
  ocio: OcioNocturno = new OcioNocturno();
  eventos: Evento[] = [];
  rpps: Rpp[] = [];
  rppDeleted: Rpp = new Rpp();
  newRpp: Rpp = new Rpp();
  listas: ListaOcio[] = [];
  mostrarCarta: boolean = false;
  isDisable = false;
  cartaOcio: CartaOcio = new CartaOcio();
  constructor(
    private ocioNocturnoService : OcionocturnoService,
    private eventoService : EventoService,
    private rppService : RppService,
    private listaService : ListaOcioService,
    private cartaOcioService: CartaOcioService,
    private route:ActivatedRoute
  ) {this.newRpp.direccionDTO = new Direccion();
    this.newRpp.userDTO = new Usuario(); }

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

  Carta() {
    this.eventosInfo = 'carta';
  }

  Galeria() {
    this.eventosInfo = 'galeria';
  }

  RegistrarRpp() {
    if (!this.newRpp.direccionDTO) {
      this.newRpp.direccionDTO = new Direccion();
    }
    if (!this.newRpp.userDTO) {
      this.newRpp.userDTO = new Usuario();
    }
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.rppService.guardarRpp(ocioID, this.newRpp).subscribe({
          next: value => {

            this.newRpp = value as Rpp;
            console.log(value);
          },
          error: e => {
            console.error("no funciona",e);
          }
    })}})
  }

  onWillDismiss($event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Rpp>>;
    if (ev.detail.role === 'confirmar') {
      this.RegistrarRpp()
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancelar')
  }

  confirmar() {
    this.modal.dismiss(this.newRpp, 'confirmar')
  }

  guardarCarta(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.cartaOcioService.guardarCarta(ocioID, this.cartaOcio).subscribe({
          next: value => {
            this.cartaOcio = value as CartaOcio;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }
  eliminarCarta(){
    this.route.params.subscribe(params => {
      const cartaId = +params['id'];
      if (cartaId) {
        this.cartaOcioService.eliminarCarta(cartaId).subscribe({
          next: value => {
            this.cartaOcio = value as CartaOcio;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }


  saveCarta() {
    this.mostrarCarta = true;
    this.isDisable  = true;
    this.guardarCarta()
  }

  deleteCarta() {
    this.mostrarCarta = false;
    this.isDisable  = false;
    this.eliminarCarta();
  }
}




