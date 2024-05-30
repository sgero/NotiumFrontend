import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {IonicModule, IonModal, LoadingController, ToastController} from "@ionic/angular";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ActivatedRoute, Router} from "@angular/router";
import {Evento} from "../../models/Evento";
import {EventoService} from "../../services/evento.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RppService} from "../../services/rpp.service";
import {Rpp} from "../../models/Rpp";
import {ListaOcio} from "../../models/ListaOcio";
import {ListaOcioService} from "../../services/listaOcio.service";
import {
  AbstractControl,
  FormBuilder, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {Direccion} from "../../models/Direccion";
import {Usuario} from "../../models/Usuario";
import {MatButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {arrowForward, calendar, closeOutline, flameOutline, pricetags, shirtOutline, watch} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CodigoVestimentaOcio} from "../../models/CodigoVestimentaOcio";
import {EdadMinimaOcio} from "../../models/EdadMinimaOcio";
import {provideNativeDateAdapter} from "@angular/material/core";
import {CartaocioComponent} from "../cartaocio/cartaocio.component";
import {CartaOcio} from "../../models/CartaOcio";
import {CartaOcioService} from "../../services/cartaOcio.service";
import {CrearEvento} from "../../models/CrearEvento";
import {CrearEventoCiclico} from "../../models/CrearEventoCiclico";
import {DatosComprador} from "../../models/DatosComprador";
import {Consumiciones} from "../../models/Consumiciones";
import {Botellas} from "../../models/Botellas";
import {EntradaOcio} from "../../models/EntradaOcio";
import {ReservadoOcio} from "../../models/ReservadoOcio";
import {ClienteService} from "../../services/cliente.service";
import {UsuarioService} from "../../services/usuario.service";
import {RepetirCicloEventoOcio} from "../../models/RepetirCicloEventoOcio";
import {DiasARepetirCicloEventoOcio} from "../../models/DiasARepetirCicloEventoOcio";
import {EntradaOcioCliente} from "../../models/EntradaOcioCliente";
import {ComprarReservadoDTO} from "../../models/ComprarReservadoDTO";
import {ListaOcioCliente} from "../../models/ListaOcioCliente";

const IonIcons = {
  shirtOutline,
  arrowForward,
  calendar,
  watch,
  pricetags,
  closeOutline,
  flameOutline
}

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
    MatButton,
    MatDatepicker,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    DatePipe
  ],
})
export class GestionocioComponent implements OnInit {

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
  isModalOpen = false;
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  eventoDTO = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    tematica: ['', Validators.required],
    fecha: ['', [Validators.required, this.futureDateValidator()]],
    codigoVestimentaOcio: ['', Validators.required],
    edadMinimaOcio: ['', Validators.required],
    aforo: ['', Validators.required],
    cartel: ['', Validators.required],
    ocioNocturnoDTO: ['', Validators.required],
  });
  entradaOcioDTO = this.formBuilder.group({
    precio: ['', [Validators.required, Validators.min(0)]],
    totalEntradas: ['', [Validators.required, Validators.min(3)]],
    detalleEntrada: ['', Validators.required],
    consumiciones: ['', Validators.required]
  });

  reservadoOcioDTO = this.formBuilder.group({
    precio: ['', [Validators.required, Validators.min(0)]],
    reservadosDisponibles: ['', [Validators.required, Validators.min(1)]],
    personasMaximasPorReservado: ['', [Validators.required, Validators.min(2)]],
    botellas: ['', Validators.required],
    detalleReservado: ['', Validators.required],
  });

  listaOcioDTO = this.formBuilder.group({
    precio: ['', [Validators.required, Validators.min(0)]],
    total_invitaciones: ['', [Validators.required, Validators.min(1)]],
    detalleLista: ['', Validators.required],
    consumiciones: ['', Validators.required],
    rppDTO: [new Rpp(), Validators.required],
  });

  opcionesEventoCiclico = this.formBuilder.group({
    repetirCicloEventoOcio: ['', Validators.required],
    diasARepetirCicloEventoOcioList: [[''], Validators.required],
  });


  unico = true;
  vestimentas: string[] = Object.keys(CodigoVestimentaOcio).filter(key => isNaN(Number(key))) as string[];
  edadMinima: string[] = Object.keys(EdadMinimaOcio).filter(key => isNaN(Number(key))) as string[];
  consumiciones: string[] = Object.keys(Consumiciones).filter(key => isNaN(Number(key))) as string[];
  botellas: string[] = Object.keys(Botellas).filter(key => isNaN(Number(key))) as string[];
  diasARepetirCicloEventoOcioList: string[] = Object.keys(DiasARepetirCicloEventoOcio).filter(key => isNaN(Number(key))) as string[];
  repetirCicloEventoOcio: string[] = Object.keys(RepetirCicloEventoOcio).filter(key => isNaN(Number(key))) as string[];
  crearEvento = new CrearEvento();
  crearEventoCiclico = new CrearEventoCiclico();
  eventoEnviado = false;
  entradaEnviada = false;
  eventoAforoNuevo!: number;
  personasMaxPorReservado!: number;
  totalEntradas!: number;
  reservadoEnviado = false;
  capacidadTotalReservados!: number;
  usuarioLogeado: any;
  esCliente?: boolean;
  permisosParaEditar = false;
  listaEnviada: number[] = [];
  totalEntradasLista = 0;
  disponibilidadRestante!: number;
  listasOcio: ListaOcio[] = [];
  formsLista: FormGroup[] = [];
  numerosLista: number[] = [];
  cantidad: number[] = [];
  iterable = false;
  listaActivada = false;
  opcionesEventoCiclicoBool = false;

  constructor(
    private ocioNocturnoService: OcionocturnoService,
    private eventoService: EventoService,
    private rppService: RppService,
    private listaService: ListaOcioService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartaOcioService: CartaOcioService,
    private datePipe: DatePipe,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {
    addIcons(IonIcons);
    this.newRpp.direccionDTO = new Direccion();
    this.newRpp.userDTO = new Usuario();
  }

  ngOnInit() {
    this.getOcio()
    this.getUsuario();
    this.formsLista.push(this.listaOcioDTO);
  }


  getOcio() {
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.ocioNocturnoService.ocioPorId(ocioID).subscribe({
          next: value => {
            this.ocio = value as OcioNocturno;
            this.eventoDTO.get('aforo')?.setValidators([
              Validators.min(5),
              Validators.max(this.ocio.aforo!)
            ]);
            this.eventoDTO.get('aforo')?.updateValueAndValidity();
            this.getRpps();
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getEventos() {
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

  getRpps() {
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

  getListas() {
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

  deleteRpp() {
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
          },
          error: e => {
            console.error("no funciona", e);
          }
        })
      }
    })
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

  guardarCarta() {
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

  eliminarCarta() {
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
    this.isDisable = true;
    this.guardarCarta()
  }

  deleteCarta() {
    this.mostrarCarta = false;
    this.isDisable = false;
    this.eliminarCarta();
  }

  openM(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  eventoUnico(b: boolean) {
    this.unico = b;
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();

      if (inputDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
        return {futureDate: true};
      }
      return null;
    };
  }


  addEvento() {
    const formValues = this.eventoDTO.value;
    let cVestimenta = formValues.codigoVestimentaOcio!;
    let v;
    if ('DISFRAZ' == cVestimenta) {
      v = CodigoVestimentaOcio.DISFRAZ;
    } else if ('INFORMAL' == cVestimenta) {
      v = CodigoVestimentaOcio.INFORMAL;
    } else if ('ELEGANTE' == cVestimenta) {
      v = CodigoVestimentaOcio.ELEGANTE;
    } else if ('ETIQUETA' == cVestimenta) {
      v = CodigoVestimentaOcio.ETIQUETA;
    }
    let minima = formValues.edadMinimaOcio!;
    let e;
    if ('DIECISEIS' == minima) {
      e = EdadMinimaOcio.DIECISEIS;
    } else if ('DIECIOCHO' == minima) {
      e = EdadMinimaOcio.DIECIOCHO;
    } else if ('VEINTIUNO' == minima) {
      e = EdadMinimaOcio.VEINTIUNO;
    } else if ('VEINTICINCO' == minima) {
      e = EdadMinimaOcio.VEINTICINCO;
    }
    let fecha = formValues.fecha!;
    fecha = <string>this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const nuevoEvento: Evento = {
      nombre: formValues.nombre || '',
      descripcion: formValues.descripcion || '',
      tematica: formValues.tematica || '',
      fecha: fecha,
      aforo: Number(formValues.aforo!) || undefined,
      cartel: formValues.cartel || '',
      codigoVestimentaOcio: v,
      edadMinimaOcio: e,
      ocioNocturnoDTO: this.ocio
    };
    if (this.unico) {
      this.crearEvento.eventoDTO = nuevoEvento;
      this.crearEventoCiclico = new CrearEventoCiclico();
    } else {
      this.crearEventoCiclico.eventoDTO = nuevoEvento;
      this.crearEvento = new CrearEvento();
    }
    console.log(this.crearEvento, nuevoEvento, fecha)
    this.eventoEnviado = true;
    this.setearDisponibilidadGeneral(nuevoEvento.aforo!);
  }

  addEntrada() {
    const formValues = this.entradaOcioDTO.value;
    let con = formValues.consumiciones!;
    let e;
    if ('CERO' == con) {
      e = Consumiciones.CERO;
    } else if ('UNA' == con) {
      e = Consumiciones.UNA;
    } else if ('DOS' == con) {
      e = Consumiciones.DOS;
    } else if ('TRES' == con) {
      e = Consumiciones.TRES;
    } else if ('CUATRO' == con) {
      e = Consumiciones.CUATRO;
    } else if ('CINCO' == con) {
      e = Consumiciones.CINCO;
    }
    const nuevaEntrada: EntradaOcio = {
      precio: Number(formValues.precio) || undefined,
      totalEntradas: Number(formValues.totalEntradas) || undefined,
      detalleEntrada: formValues.detalleEntrada || '',
      consumiciones: e
    };
    if (this.unico) {
      this.crearEvento.entradaOcioDTO = nuevaEntrada;
      this.crearEventoCiclico = new CrearEventoCiclico();
    } else {
      this.crearEventoCiclico.entradaOcioDTO = nuevaEntrada;
      this.crearEvento = new CrearEvento();
    }
    this.entradaEnviada = true;
    this.totalEntradas = nuevaEntrada.totalEntradas!;
  }

  addReservado() {
    const formValues = this.reservadoOcioDTO.value;
    let b = formValues.botellas!;
    let e;
    if ('CERO' == b) {
      e = Botellas.CERO;
    } else if ('UNA' == b) {
      e = Botellas.UNA;
    } else if ('DOS' == b) {
      e = Botellas.DOS;
    } else if ('TRES' == b) {
      e = Botellas.TRES;
    } else if ('CUATRO' == b) {
      e = Botellas.CUATRO;
    } else if ('CINCO' == b) {
      e = Botellas.CINCO;
    }
    const nuevoReservado: ReservadoOcio = {
      precio: Number(formValues.precio) || undefined,
      reservadosDisponibles: Number(formValues.reservadosDisponibles) || undefined,
      personasMaximasPorReservado: Number(formValues.personasMaximasPorReservado) || undefined,
      detalleReservado: formValues.detalleReservado || '',
      botellas: e
    };
    if (this.unico) {
      this.crearEvento.reservadoOcioDTO = nuevoReservado;
      this.crearEventoCiclico = new CrearEventoCiclico();
    } else {
      this.crearEventoCiclico.reservadoOcioDTO = nuevoReservado;
      this.crearEvento = new CrearEvento();
    }
    this.reservadoEnviado = true;
    this.capacidadTotalReservados = nuevoReservado.reservadosDisponibles! * nuevoReservado.personasMaximasPorReservado!;
    this.actualizarNumerosLista(this.capacidadTotalReservados + this.totalEntradas);
  }

  addLista(indice: number) {
    const formValues = this.listaOcioDTO.value;
    let con = formValues.consumiciones!;
    let e;
    if ('CERO' == con) {
      e = Consumiciones.CERO;
    } else if ('UNA' == con) {
      e = Consumiciones.UNA;
    } else if ('DOS' == con) {
      e = Consumiciones.DOS;
    } else if ('TRES' == con) {
      e = Consumiciones.TRES;
    } else if ('CUATRO' == con) {
      e = Consumiciones.CUATRO;
    } else if ('CINCO' == con) {
      e = Consumiciones.CINCO;
    }
    const nuevaLista: ListaOcio = {
      precio: Number(formValues.precio) || undefined,
      total_invitaciones: Number(formValues.total_invitaciones) || undefined,
      detalleLista: formValues.detalleLista || '',
      consumiciones: e,
      rppDTO: formValues.rppDTO || undefined,
      activo: false
    };
    if (this.unico) {
      this.listasOcio.push(nuevaLista);
      this.crearEvento.listaOcioDTO = this.listasOcio;
      this.crearEventoCiclico = new CrearEventoCiclico();
    } else {
      this.listasOcio.push(nuevaLista);
      this.crearEventoCiclico.listaOcioDTO = this.listasOcio;
      this.crearEvento = new CrearEvento();
    }
    this.listaEnviada.push(indice);
    this.totalEntradasLista += nuevaLista.total_invitaciones!;
    this.disponibilidadRestante =  this.eventoAforoNuevo - (this.capacidadTotalReservados + this.totalEntradas + this.totalEntradasLista);

  }

  verifyEventoForm() {
    const formValues = this.eventoDTO.value;
    return formValues.nombre != ''
      && formValues.descripcion != ''
      && formValues.tematica != ''
      && formValues.fecha != ''
      && formValues.codigoVestimentaOcio != null
      && formValues.edadMinimaOcio != null
      && formValues.aforo != ''
      && formValues.cartel != ''
      && formValues.ocioNocturnoDTO != null
  }


  setearDisponibilidadGeneral(max: number) {
    this.entradaOcioDTO.get('totalEntradas')?.setValidators([
      Validators.required,
      Validators.min(3),
      Validators.max(max - 3)
    ]);
    this.eventoAforoNuevo = max;
    this.entradaOcioDTO.get('totalEntradas')?.updateValueAndValidity();
  }

  setearDisponibilidadReservado(reservadosDisponibles: any) {
    const aforoEvento = this.eventoAforoNuevo;
    const disponibilidadRestante = aforoEvento - this.totalEntradas - 2;
    let personasMaxPPReservado = Math.ceil(disponibilidadRestante / reservadosDisponibles) - 1;
    if (aforoEvento && disponibilidadRestante && personasMaxPPReservado) {
      this.reservadoOcioDTO.get('personasMaximasPorReservado')?.setValidators([
        Validators.required,
        Validators.min(2),
        Validators.max(personasMaxPPReservado)
      ]);
      this.personasMaxPorReservado = personasMaxPPReservado;
      this.reservadoOcioDTO.get('personasMaximasPorReservado')?.updateValueAndValidity();
      return true;
    }
    return false;
  }

  setearDisponibilidadLista(cantidad: number, entradasTotales: number) {
    for (let x = 0; x < cantidad; x++) {
      this.cantidad.push(x + 1);
    }
    const disponibilidadRestante = this.eventoAforoNuevo - entradasTotales;
    let personasMaxPorLista = disponibilidadRestante - cantidad;
    this.listaOcioDTO.get('total_invitaciones')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(personasMaxPorLista)
    ]);
    this.disponibilidadRestante = disponibilidadRestante - cantidad;
    for (let x = 0; x < disponibilidadRestante; x++) {
      this.numerosLista.push(x);
    }
    this.listaOcioDTO.get('total_invitaciones')?.updateValueAndValidity();
  }

  actualizarNumerosLista(entradasTotales: number) {
    const disponibilidadRestante = this.eventoAforoNuevo - entradasTotales;
    for (let x = 0; x < disponibilidadRestante; x++) {
      this.numerosLista.push(x + 1);
    }
    if (this.numerosLista.length != 0) {
      this.iterable = true;
    }
  }

  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        this.usuarioLogeado = value;
        this.getDTO(this.usuarioLogeado);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getDTO(usuario: any) {
    if (usuario.rol == "CLIENTE") {
      this.esCliente = true;
    } else if (usuario.rol != "OCIONOCTURNO") {
      this.esCliente = false;
      this.router.navigate(["notium/error"])
    } else {
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          if (value.id == this.ocio.id) {
            this.permisosParaEditar = true;
          }
        },
        error: err => {
          console.error(err);
        }
      })
    }

  }


  async guardarEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Evento...',
      duration: 1000,
    });
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error inesperado durante el proceso de creación.',
      duration: 3000,
      position: "top"
    });
    if (this.unico) {
      this.eventoService.guardarEvento(this.crearEvento).subscribe({
        next: async value => {
          if (value.object as Evento) {
            await loading.present();
            const evento = value.object as Evento;
            this.router.navigate(['/notium/ocionocturno/evento/', evento.id]);
          } else {
            await toast.present();
            this.isModalOpen = false;
          }
        },
        error: async err => {
          await toast.present();
          this.isModalOpen = false;
          console.error(err);
        }
      });
    } else {
      this.eventoService.crearEventoCiclico(this.crearEventoCiclico).subscribe({
        next: async value => {
          if (value.object as Evento) {
            await loading.present();
            const evento = value.object as Evento;
            this.router.navigate(['/notium/ocionocturno/evento/', evento.id]);
          } else {
            await toast.present();
            this.isModalOpen = false;
          }
        },
        error: async err => {
          await toast.present();
          this.isModalOpen = false;
          console.error(err);
        }
      });
    }
    this.isModalOpen = false;
  }

  datoYaEnviado(c: number): boolean {
    return this.listaEnviada.includes(c);
  }

  activarLista(n: number) {
    if (this.unico && this.crearEvento.listaOcioDTO) {
      if (n - 1 >= 0 && n - 1 < this.crearEvento.listaOcioDTO.length) {
        this.crearEvento.listaOcioDTO[n - 1].activo = true;
      }
    } else if (!this.unico && this.crearEventoCiclico.listaOcioDTO){
      if (n - 1 >= 0 && n - 1 < this.crearEventoCiclico.listaOcioDTO.length) {
        this.crearEventoCiclico.listaOcioDTO[n - 1].activo = true;
      }
    }
    this.listaActivada = true;
  }


  addOpcionesEventoCiclico() {
    const formValues = this.opcionesEventoCiclico.value;
    let con = formValues.repetirCicloEventoOcio!;
    let e;
    if ('UNA_SEMANA' == con) {
      e = RepetirCicloEventoOcio.UNA_SEMANA;
    } else if ('UN_MES' == con) {
      e = RepetirCicloEventoOcio.UN_MES;
    } else if ('TRES_MESES' == con) {
      e = RepetirCicloEventoOcio.TRES_MESES;
    } else if ('SEIS_MESES' == con) {
      e = RepetirCicloEventoOcio.SEIS_MESES;
    }
    if (!this.unico){
      this.crearEventoCiclico.repetirCicloEventoOcio = e;
      let d: any;
      d = formValues.diasARepetirCicloEventoOcioList
      this.crearEventoCiclico.diasARepetirCicloEventoOcioList = d;
    }
    this.opcionesEventoCiclicoBool = true;
    console.log(this.crearEventoCiclico)
  }
}



