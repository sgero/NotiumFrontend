import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../models/Evento";
import {EventoService} from "../../../services/evento.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FooterocionocturnoComponent} from "../../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../../headerocionocturno/headerocionocturno.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {EdadMinimaOcio} from "../../../models/EdadMinimaOcio";
import {arrowForward, calendar, closeOutline, pricetags, shirtOutline, watch} from "ionicons/icons";
import {addIcons} from "ionicons";
import {InformacionTiposEntradasEvento} from "../../../models/InformacionTiposEntradasEvento";
// import {DetalleCompraComponent} from "./detalle-compra/detalle-compra.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PromocionService} from "../../../services/promocion.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Promocion} from "../../../models/Promocion";

const IonIcons = {
  shirtOutline,
  arrowForward,
  calendar,
  watch,
  pricetags,
  closeOutline
}
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  imports: [
    FooterocionocturnoComponent,
    HeaderocionocturnoComponent,
    IonicModule,
    NgForOf,
    RouterLink,
    // DetalleCompraComponent,
    NgIf,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatStepLabel,
    MatInput,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    FormsModule
  ],
  standalone: true
})

export class EventDetailComponent  implements OnInit {
  isModalOpen = false;
  evento?:Evento;
  fechaEvento?: string;
  codigoVestimenta?:string;
  edadMinima?:number ;
  informacionTiposEntrada?:InformacionTiposEntradasEvento;
  cantidad:number = 0;
  precioFinal:number = 0;
  subtotal:number = 0;
  entrada: boolean = false;
  reservado: boolean = false;
  lista :boolean = false;
  disponibilidad:number[] = [1,2,3,4,5];
  datosARellenar:number[] = [];
  promocionesActivas: Promocion[] = [];

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  promociones: number = 0;
  constructor(private eventoService : EventoService, private route:ActivatedRoute, private formBuilder : FormBuilder, private promocionService:PromocionService) {
    addIcons(IonIcons);
  }

  ngOnInit() {
    this.route.params.subscribe(params =>
    {const id= +params['id'];
      if (id){
        this.getById(id);
        this.getTiposEntradasInfo(id);
      }
    });
    this.getPromocionesActivas();
  }

  getById(id:number){
    this.eventoService.getById(id).subscribe({
      next: value => {
        this.evento = value.object as Evento;
        if (this.evento.fecha != undefined){
          const fechaString = this.evento.fecha;
          const fecha = new Date(fechaString);
          const opcionesFormato: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
          this.fechaEvento = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          this.codigoVestimenta = this.evento.codigoVestimentaOcio?.toString();
          if (this.codigoVestimenta != undefined){
            this.codigoVestimenta = this.codigoVestimenta.charAt(0).toUpperCase() + this.codigoVestimenta.slice(1).toLowerCase();
          }
          if (this.evento.edadMinimaOcio != undefined){
            this.getEdadMinima(this.evento.edadMinimaOcio);
          }
        }
      },
      error: e => {
        console.error(e);
      }
    })
  }

  getTiposEntradasInfo(id:number){
    this.eventoService.getInfoEntradas(id).subscribe({
      next: value => {
        this.informacionTiposEntrada = value.object;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getEdadMinima(edad: EdadMinimaOcio.DIECISEIS | EdadMinimaOcio.DIECIOCHO | EdadMinimaOcio.VEINTIUNO | EdadMinimaOcio.VEINTICINCO){
    if (edad.toString() == 'DIECISEIS'){
      this.edadMinima = 16;
    }else if (edad.toString() == 'DIECIOCHO'){
      this.edadMinima = 18;
    }else if (edad.toString() == 'VEINTIUNO'){
      this.edadMinima = 21;
      }else if (edad.toString() == 'VEINTICINCO') {
      this.edadMinima = 25
    }
  }

  setOpenGeneral(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.entrada = isOpen;
    if (!isOpen){
      this.cantidad = 0;
      this.subtotal = 0;
      this.promociones = 0;
      this.precioFinal = 0;
    }
  }

  actualizarCantidadGeneral(cantidad:number){
    const precio = this.informacionTiposEntrada?.entradaOcioDTO?.precio;
    this.subtotal = precio! * cantidad;
    this.cantidad = cantidad;
    this.precioFinal = this.subtotal - this.promociones;
    for (let x = 0 ; x! < cantidad; x!++){
      this.datosARellenar.push(x!);
    }
  }

  getPromocionesActivas(){
    this.promocionService.getActivas().subscribe({
      next: value => {
        this.promocionesActivas = value;
      },
      error: err => {
        console.error(err);
      }
    })
  }



}
