import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Rpp} from "../../../models/Rpp";
import {CodigoVestimentaOcio} from "../../../models/CodigoVestimentaOcio";
import {EdadMinimaOcio} from "../../../models/EdadMinimaOcio";
import {Consumiciones} from "../../../models/Consumiciones";
import {Botellas} from "../../../models/Botellas";
import {DiasARepetirCicloEventoOcio} from "../../../models/DiasARepetirCicloEventoOcio";
import {RepetirCicloEventoOcio} from "../../../models/RepetirCicloEventoOcio";
import {CrearEvento} from "../../../models/CrearEvento";
import {CrearEventoCiclico} from "../../../models/CrearEventoCiclico";
import {ListaOcio} from "../../../models/ListaOcio";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {EventoService} from "../../../services/evento.service";
import {RppService} from "../../../services/rpp.service";
import {ListaOcioService} from "../../../services/listaOcio.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CartaOcioService} from "../../../services/cartaOcio.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {UsuarioService} from "../../../services/usuario.service";
import {IonicModule, LoadingController, ToastController} from "@ionic/angular";
import {Evento} from "../../../models/Evento";
import {EntradaOcio} from "../../../models/EntradaOcio";
import {ReservadoOcio} from "../../../models/ReservadoOcio";
import {OcioNocturno} from "../../../models/OcioNocturno";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss'],
  imports: [
    IonicModule,
    MatStepper,
    MatStep,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    MatButton,
    MatIcon,
    MatInput,
    MatLabel,
    MatStepLabel,
    MatStepperNext,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterLink,
    MatProgressSpinner
  ],
  standalone: true
})
export class EditarEventoComponent  implements OnInit {
  @Input() isModalOpen = false;
  @Input() informacionEvento?:CrearEvento;
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
  ocio: OcioNocturno = new OcioNocturno();
  rpps: Rpp[] = [];
  eventos: Evento[] = [];
  formularioRellenado = false;
  @Output() eventoModificado = new EventEmitter<number>();


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
  ) { }

  ngOnInit() {
    this.getOcio()
    this.getUsuario();
    this.formsLista.push(this.listaOcioDTO);
    this.rellenarFormulario(this.informacionEvento!);
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


  async guardarEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Evento...',
      duration: 1000,
    });
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error inesperado durante el proceso de edición.',
      duration: 3000,
      position: "top"
    });
    if (this.unico) {
      this.crearEvento.eventoDTO!.id! = <number>this.informacionEvento?.eventoDTO?.id;
      this.crearEvento.entradaOcioDTO!.id! = <number>this.informacionEvento?.entradaOcioDTO?.id;
      this.crearEvento.reservadoOcioDTO!.id! = <number>this.informacionEvento?.reservadoOcioDTO?.id;
      this.informacionEvento?.listaOcioDTO?.forEach((l, index) => {
        this.crearEvento!.listaOcioDTO![index]!.id = l.id;
      });
      this.eventoService.guardarEvento(this.crearEvento).subscribe({
        next: async value => {
          if (value.object as Evento) {
            await loading.present();
            const evento = value.object !as Evento;
            this.eventoModificado.emit(evento.id);
          } else {
            await toast.present();
          }
          this.isModalOpen = false;
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
  openM(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  eventoUnico(b: boolean) {
    this.unico = b;
  }
  getOcio() {
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.ocioNocturnoService.ocioPorIdEvento(ocioID).subscribe({
          next: value => {
            this.ocio = value as OcioNocturno;
            this.eventoDTO.get('aforo')?.setValidators([
              Validators.min(5),
              Validators.max(this.ocio.aforo!)
            ]);
            this.eventoDTO.get('aforo')?.updateValueAndValidity();
            this.getRpps(this.ocio.id!);
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }
  getRpps(ocioID:number) {
      this.rppService.rppsByOcio(ocioID).subscribe({
        next: value => {
          this.rpps = value as Rpp[];
        },
        error: e => {
          console.error(e);
        }
      })
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

  rellenarFormulario(informacionEvento: CrearEvento) {
    this.eventoDTO.get('nombre')?.setValue(String(informacionEvento.eventoDTO?.nombre));
    this.eventoDTO.get('descripcion')?.setValue(String(informacionEvento.eventoDTO?.descripcion));
    this.eventoDTO.get('tematica')?.setValue(String(informacionEvento.eventoDTO?.tematica));
    this.eventoDTO.get('fecha')?.setValue(String(informacionEvento.eventoDTO?.fecha));
    this.eventoDTO.get('codigoVestimentaOcio')?.setValue(String(informacionEvento.eventoDTO?.codigoVestimentaOcio));
    this.eventoDTO.get('edadMinimaOcio')?.setValue(String(informacionEvento.eventoDTO?.edadMinimaOcio));
    this.eventoDTO.get('cartel')?.setValue(String(informacionEvento.eventoDTO?.cartel));
    this.eventoDTO.get('aforo')?.setValue(String(informacionEvento.eventoDTO?.aforo));

    this.entradaOcioDTO.get('precio')?.setValue(String(informacionEvento.entradaOcioDTO?.precio));
    this.entradaOcioDTO.get('totalEntradas')?.setValue(String(informacionEvento.entradaOcioDTO?.totalEntradas));
    this.entradaOcioDTO.get('detalleEntrada')?.setValue(String(informacionEvento.entradaOcioDTO?.detalleEntrada));
    this.entradaOcioDTO.get('consumiciones')?.setValue(String(informacionEvento.entradaOcioDTO?.consumiciones));

    this.reservadoOcioDTO.get('precio')?.setValue(String(informacionEvento.reservadoOcioDTO?.precio));
    this.reservadoOcioDTO.get('reservadosDisponibles')?.setValue(String(informacionEvento.reservadoOcioDTO?.reservadosDisponibles));
    this.reservadoOcioDTO.get('personasMaximasPorReservado')?.setValue(String(informacionEvento.reservadoOcioDTO?.personasMaximasPorReservado));
    this.reservadoOcioDTO.get('botellas')?.setValue(String(informacionEvento.reservadoOcioDTO?.botellas));
    this.reservadoOcioDTO.get('detalleReservado')?.setValue(String(informacionEvento.reservadoOcioDTO?.detalleReservado));

    informacionEvento.listaOcioDTO?.forEach(l => {
      this.listaOcioDTO.get('precio')?.setValue(String(l.precio));
      this.listaOcioDTO.get('total_invitaciones')?.setValue(String(l.total_invitaciones));
      this.listaOcioDTO.get('detalleLista')?.setValue(String(l.detalleLista));
      this.listaOcioDTO.get('consumiciones')?.setValue(String(l.consumiciones));
      this.listaOcioDTO.get('rppDTO')?.setValue(l.rppDTO!);
      this.formsLista.push(this.listaOcioDTO);
    });
    this.actualizarNumerosLista(informacionEvento.entradaOcioDTO?.totalEntradas! + ( informacionEvento.reservadoOcioDTO?.reservadosDisponibles! * informacionEvento.reservadoOcioDTO?.personasMaximasPorReservado!));
    this.setearDisponibilidadLista( informacionEvento.listaOcioDTO?.length!,informacionEvento.entradaOcioDTO?.totalEntradas! + ( informacionEvento.reservadoOcioDTO?.reservadosDisponibles! * informacionEvento.reservadoOcioDTO?.personasMaximasPorReservado!));
    this.formularioRellenado = true;

  }
}
