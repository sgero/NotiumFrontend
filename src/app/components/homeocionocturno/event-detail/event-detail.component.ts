import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../models/Evento";
import {EventoService} from "../../../services/evento.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IonicModule, LoadingController, ToastController} from "@ionic/angular";
import {FooterocionocturnoComponent} from "../../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../../headerocionocturno/headerocionocturno.component";
import {NgForOf, NgIf} from "@angular/common";
import {EdadMinimaOcio} from "../../../models/EdadMinimaOcio";
import {arrowForward, calendar, closeOutline, pricetags, shirtOutline, watch} from "ionicons/icons";
import {addIcons} from "ionicons";
import {InformacionTiposEntradasEvento} from "../../../models/InformacionTiposEntradasEvento";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PromocionService} from "../../../services/promocion.service";
import {Promocion} from "../../../models/Promocion";
import {DatosComprador} from "../../../models/DatosComprador";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {Cliente} from 'src/app/models/Cliente';
import {Genero} from "../../../models/Genero";
import {EntradaOcioCliente} from "../../../models/EntradaOcioCliente";
import {ReservadoOcioCliente} from "../../../models/ReservadoOcioCliente";

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
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatIcon,
    MatHint,
    MatError
  ],
  standalone: true
})

export class EventDetailComponent implements OnInit {
  isModalOpen = false;
  evento?: Evento;
  fechaEvento?: string;
  codigoVestimenta?: string;
  edadMinima?: number;
  informacionTiposEntrada?: InformacionTiposEntradasEvento;
  cantidad: number = 0;
  precioFinal: number = 0;
  subtotal: number = 0;
  entrada: boolean = false;
  reservado: boolean = false;
  lista: boolean = false;
  disponibilidad: number[] = [1, 2, 3, 4, 5];
  disponibilidadReservado: number[] = [];
  datosARellenar: number[] = [];
  promocionesActivas: Promocion[] = [];
  codigoPromocion!: string;
  idPromocionElegida!: number;
  datosAsistentes: EntradaOcioCliente[] = [];
  yaEnviado: number[] = [];
  cliente?: Cliente;
  generos: string[] = Object.keys(Genero).filter(key => isNaN(Number(key))) as string[];
  fechaActual: string = new Date().toString();
  pagar = false;
  reservadoOcioCliente = new ReservadoOcioCliente();

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  datosCompradores = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    fecha: ['', Validators.required],
    genero: ['', Validators.required],
    telefono: ['', Validators.required],
  });
  isLinear = false;
  promociones: number = 0;
  cantidadADescontar: number = 0;
  promocionElegida!: Promocion;
  verPromocion = false;
  isGeneral = false;
  isReservado = false;
  isLista = false;


  constructor(private toastController: ToastController, private loadingCtrl: LoadingController, private eventoService: EventoService, private route: ActivatedRoute, private formBuilder: FormBuilder, private promocionService: PromocionService) {
    addIcons(IonIcons);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.getById(id);
        this.getTiposEntradasInfo(id);
      }
    });
    this.getPromocionesActivas();
  }

  getById(id: number) {
    this.eventoService.getById(id).subscribe({
      next: value => {
        this.evento = value.object as Evento;
        if (this.evento.fecha != undefined) {
          const fechaString = this.evento.fecha;
          const fecha = new Date(fechaString);
          const opcionesFormato: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
          this.fechaEvento = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          this.codigoVestimenta = this.evento.codigoVestimentaOcio?.toString();
          if (this.codigoVestimenta != undefined) {
            this.codigoVestimenta = this.codigoVestimenta.charAt(0).toUpperCase() + this.codigoVestimenta.slice(1).toLowerCase();
          }
          if (this.evento.edadMinimaOcio != undefined) {
            this.getEdadMinima(this.evento.edadMinimaOcio);
          }
        }
      },
      error: e => {
        console.error(e);
      }
    })
  }

  getTiposEntradasInfo(id: number) {
    this.eventoService.getInfoEntradas(id).subscribe({
      next: value => {
        this.informacionTiposEntrada = value.object;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getEdadMinima(edad: EdadMinimaOcio.DIECISEIS | EdadMinimaOcio.DIECIOCHO | EdadMinimaOcio.VEINTIUNO | EdadMinimaOcio.VEINTICINCO) {
    if (edad.toString() == 'DIECISEIS') {
      this.edadMinima = 16;
    } else if (edad.toString() == 'DIECIOCHO') {
      this.edadMinima = 18;
    } else if (edad.toString() == 'VEINTIUNO') {
      this.edadMinima = 21;
    } else if (edad.toString() == 'VEINTICINCO') {
      this.edadMinima = 25
    }
  }

  setOpenGeneral(isOpen: boolean, isGeneral: boolean, isReservado: boolean, isLista: boolean) {
    this.isGeneral = isGeneral;
    this.isReservado = isReservado;
    this.isLista = isLista;
    this.isModalOpen = isOpen;
    this.entrada = isOpen;
    if (!isOpen) {
      this.cantidad = 0;
      this.subtotal = 0;
      this.promociones = 0;
      this.precioFinal = 0;
      this.codigoPromocion = '';
      this.datosARellenar = [0];
    }
    if (isReservado) {
      for (let x = 0; x < this.informacionTiposEntrada?.reservadoOcioDTO?.personasMaximasPorReservado!; x++) {
        this.disponibilidadReservado.push(x + 1);
      }
    }
  }

  actualizarCantidadGeneral(cantidad: number) {
    let precio;
    if (this.isGeneral) {
      precio = this.informacionTiposEntrada?.entradaOcioDTO?.precio;
    } else if (this.isReservado) {
      precio = this.informacionTiposEntrada?.reservadoOcioDTO?.precio;
    } else if (this.isLista) {
      precio = this.informacionTiposEntrada?.listaOcioDTO?.precio;
    }
    this.subtotal = precio! * cantidad;
    this.datosARellenar = [0];
    this.cantidad = cantidad;
    this.precioFinal = this.subtotal - this.promociones;
    if (this.isReservado) {
      for (let x = 1; x! < this.disponibilidadReservado.length; x!++) {
        this.datosARellenar.push(x!);
      }
    } else {
      for (let x = 1; x! < cantidad; x!++) {
        this.datosARellenar.push(x!);
      }
    }
  }

  getPromocionesActivas() {
    this.promocionService.getActivas().subscribe({
      next: value => {
        this.promocionesActivas = value;
      },
      error: err => {
        console.error(err);
      }
    })
  }


  async validarPromocion() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando Código...',
      duration: 500,
    });
    const toast = await this.toastController.create({
      message: 'El código promocional introducido no es correcto.',
      duration: 1500,
      position: "top"
    });
    const params = {
      codigo: this.codigoPromocion
    };
    if (this.codigoPromocion) {
      this.promocionService.verificarCodigo(this.idPromocionElegida, params).subscribe({
        next: async value => {
          this.cantidadADescontar = value.object as number;
          if (this.cantidadADescontar != 0) {
            await loading.present();
            this.actualizarTotal();
            if (this.isReservado) {
              this.reservadoOcioCliente.promocionDTO = this.promocionElegida
            } else {
              this.datosAsistentes.push(this.promocionElegida);
            }
          } else {
            this.promociones = 0;
            this.precioFinal = this.subtotal;
            await toast.present();
          }
        },
        error: async error => {
          await toast.present();
          console.error(error);
        }
      })
    } else {
      await toast.present();
    }
  }

  promocion(promocion: Promocion) {
    this.idPromocionElegida = promocion.id!;
    this.promocionElegida = promocion!;
  }

  actualizarTotal() {
    if (this.cantidadADescontar > 0 && this.cantidadADescontar < 100) {
      this.promociones = Math.round((this.subtotal * this.cantidadADescontar) / 100);
      this.precioFinal = Math.round(this.subtotal - this.promociones);
    } else if (this.cantidadADescontar == 100) {
      this.promociones = this.subtotal;
      this.precioFinal = 0;
    }
  }

  addForm(c:number) {
    if (this.cantidad == this.datosAsistentes.length) {
      this.verPromocion = true;
    }else {
      if (this.yaEnviado.includes(c)){

      }

      const formValues = this.datosCompradores.value;

      const nuevoComprador: DatosComprador = {
        nombre: formValues.nombre || '',
        apellidos: formValues.apellidos || '',
        email: formValues.email || '',
        fecha: formValues.fecha || '',
        genero: formValues.genero || '',
        telefono: formValues.telefono || ''
      };

      this.datosAsistentes.push(nuevoComprador);
    }
  }


  addGeneroToForm(g: string) {
    this.datosCompradores.value.genero = g;
  }


  pagarOpen() {
    this.pagar = true;
  }

  actualizarPersonasReservado(numPersonas: number) {
    this.reservadoOcioCliente.cantidad_personas! = numPersonas!;
    this.actualizarCantidadGeneral(1);
  }
}
