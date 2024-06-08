import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../models/Evento";
import {EventoService} from "../../../services/evento.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IonicModule, LoadingController, ToastController} from "@ionic/angular";
import {FooterocionocturnoComponent} from "../../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../../headerocionocturno/headerocionocturno.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {EdadMinimaOcio} from "../../../models/EdadMinimaOcio";
import {arrowForward, calendar, closeOutline, flameOutline, pricetags, shirtOutline, watch} from "ionicons/icons";
import {addIcons} from "ionicons";
import {InformacionTiposEntradasEvento} from "../../../models/InformacionTiposEntradasEvento";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PromocionService} from "../../../services/promocion.service";
import {Promocion} from "../../../models/Promocion";
import {DatosComprador} from "../../../models/DatosComprador";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {Cliente} from 'src/app/models/Cliente';
import {Genero} from "../../../models/Genero";
import {EntradaOcioCliente} from "../../../models/EntradaOcioCliente";
import {ReservadoOcioCliente} from "../../../models/ReservadoOcioCliente";
import {ListaOcioCliente} from "../../../models/ListaOcioCliente";
import {ComprarReservadoDTO} from "../../../models/ComprarReservadoDTO";
import {ComprarService} from "../../../services/comprar.service";
import {CantidadesRestantesDTO} from "../../../models/CantidadesRestantesDTO";
import {UsuarioService} from "../../../services/usuario.service";
import {ClienteService} from "../../../services/cliente.service";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {PdfService} from "../../../services/pdf.service";
import {EditarEventoComponent} from "../../modales/editar-evento/editar-evento.component";
import {CrearEvento} from "../../../models/CrearEvento";
import {ChatService} from "../../../services/chat.service";
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";
import {ChatComponent} from "../../gestionocio/chat/chat.component";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";

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
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    EditarEventoComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    MatDialogContent
  ],
  standalone: true,
  providers: [
    DatePipe,
    provideNativeDateAdapter()

  ]
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
  disponibilidadGeneral: number[] = [];
  disponibilidadLista: number[] = [];
  disponibilidadReservado: number[] = [];
  datosARellenar: number[] = [];
  promocionesActivas: Promocion[] = [];
  codigoPromocion!: string;
  idPromocionElegida!: number;
  datosAsistentesEOC: EntradaOcioCliente[] = [];
  datosAsistentesLOC: ListaOcioCliente[] = [];
  datosAsistentesROC?: ComprarReservadoDTO;
  yaEnviado: number[] = [];
  cliente?: Cliente;
  generos: string[] = Object.keys(Genero).filter(key => isNaN(Number(key))) as string[];
  fechaActual = new Date().toString();
  pagar = false;
  reservadoOcioCliente = new ReservadoOcioCliente();

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  datosCompradores = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fecha: ['', [Validators.required, this.dateValidator()]],
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
  entradasCompradasExito = false;
  cantidadesRestantes!: CantidadesRestantesDTO;
  aforoEvento?: number;
  entradasVendidas?: number;
  reservadosVendidos?: number;
  personasTotalesReservadosVendidos?: number;
  invitacionesTotalesLista?: number;
  clientesApuntadosALista?: number;
  totalAsistentes?: number;
  usuarioLogeado: any;
  comprarEntradas = true;
  comprarReservado = true;
  comprarLista = true;
  disponiblesGeneral?: number;
  disponiblesReservado?: number;
  disponiblesLista?: number;
  permisosParaEditar = false;
  isModalEvento = false;
  crearEventoDTO?: CrearEvento;
  idEvento?: number;
  isDeleteOpen = false;

  constructor(private toastController: ToastController, private loadingCtrl: LoadingController,
              private eventoService: EventoService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private promocionService: PromocionService,
              private comprarService: ComprarService, private usuarioService: UsuarioService,
              private router: Router, private clienteService: ClienteService,
              private pdfService: PdfService, private datePipe: DatePipe,
              private ocioNocturnoService: OcionocturnoService,
              private chatService: ChatService,
              public dialog: MatDialog
  ) {
    addIcons(IonIcons);
  }

  public deleteButtons = [
    {
      text: 'Sí',
      role: 'confirmar',
      handler: () => {
        this.eliminarEvento();
      },
    },
    {
      text: 'No',
      role: 'cancelar',
      handler: () => {
        this.alertDelete(false);
      },
    },
  ];

  ngOnInit() {
    this.getUsuario();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.idEvento = id;
      if (id) {
        this.informacionEventoTotal(id)
        this.getById(id);
        this.getTiposEntradasInfo(id);
      }
    });
    this.getPromocionesActivas();
    this.fechaActual = <string>this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');
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
        this.informacionTiposEntrada = value.object as InformacionTiposEntradasEvento;
        this.getInfoRestantes(id);
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
    }
    return this.edadMinima;
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const date = new Date();
      let edadMinima = this.edadMinima;

      date.setFullYear(date.getFullYear() - edadMinima!);

      if (inputDate.setHours(0, 0, 0, 0) >= date.setHours(0, 0, 0, 0)) {
        return {futureDate: true};
      }
      return null;
    };
  }

  setOpenGeneral(isOpen: boolean, isGeneral: boolean, isReservado: boolean, isLista: boolean) {
    this.isGeneral = isGeneral;
    this.isReservado = isReservado;
    this.isLista = isLista;
    this.isModalOpen = isOpen;
    if (!isOpen) {
      this.cantidad = 0;
      this.subtotal = 0;
      this.promociones = 0;
      this.precioFinal = 0;
      this.codigoPromocion = '';
      this.datosARellenar = [0];
      this.datosAsistentesROC = new ComprarReservadoDTO();
      this.datosAsistentesLOC = [];
      this.datosAsistentesEOC = [];
    }
    if (isReservado) {
      for (let x = 0; x < this.informacionTiposEntrada?.reservadoOcioDTO?.personasMaximasPorReservado!; x++) {
        this.disponibilidadReservado.push(x + 1);
      }
      this.datosAsistentesROC = new ComprarReservadoDTO();
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
      for (let x = 1; x < this.reservadoOcioCliente.cantidad_personas!; x!++) {
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
      position: "top",
      color: "danger"
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
            if (this.isGeneral) {
              this.datosAsistentesEOC[0].promocionDTO = this.promocionElegida;
            } else if (this.isLista) {
              this.datosAsistentesLOC[0].promocionDTO = this.promocionElegida;
            } else {
              this.datosAsistentesROC!.reservadoOcioClienteDTO!.promocionDTO = this.promocionElegida;
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

  verifyForm() {
    const formValues = this.datosCompradores.value;
    return formValues.nombre != '' && formValues.apellidos != '' && formValues.email != '' && formValues.fecha != '' && formValues.telefono != '';
  }

  addForm(c: number) {
    const formValues = this.datosCompradores.value;
    let fecha = formValues.fecha!;
    fecha = <string>this.datePipe.transform(fecha, 'yyyy-mm-dd');
    const nuevoComprador: DatosComprador = {
      nombre: formValues.nombre || '',
      apellidos: formValues.apellidos || '',
      email: formValues.email || '',
      fechaNacimiento: fecha,
      genero: formValues.genero || '',
      telefono: formValues.telefono || ''
    };
    if (this.isGeneral) {
      let datos = new EntradaOcioCliente();
      datos.datosCompradorDTO = nuevoComprador;
      this.datosAsistentesEOC.push(datos);
    } else if (this.isLista) {
      let datos = new ListaOcioCliente();
      datos.datosCompradorDTO = nuevoComprador;
      this.datosAsistentesLOC.push(datos);
    } else if (this.isReservado) {
      this.datosAsistentesROC?.datosCompradorDTOS?.push(nuevoComprador);
      if (this.datosAsistentesROC?.reservadoOcioClienteDTO) {
        this.datosAsistentesROC.reservadoOcioClienteDTO.cantidad_personas = this.reservadoOcioCliente.cantidad_personas;
      }
    }
    this.yaEnviado.push(c);
    if (this.cantidad == this.datosAsistentesEOC.length || this.cantidad == this.datosAsistentesLOC.length) {
      this.verPromocion = true;
    } else if (this.reservadoOcioCliente.cantidad_personas == this.datosAsistentesROC?.datosCompradorDTOS?.length) {
      this.verPromocion = true;
    }
  }

  pagarOpen() {
    this.pagar = true;
  }

  actualizarPersonasReservado(numPersonas: number) {
    this.reservadoOcioCliente.cantidad_personas! = numPersonas!;
    this.actualizarCantidadGeneral(1);
  }

  datoYaEnviado(c: number): boolean {
    return this.yaEnviado.includes(c);
  }

  async comprar() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Compra...',
      duration: 1000,
    });
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error inesperado durante el proceso de compra.',
      duration: 3000,
      position: "top",
      color: "danger"
    });
    if (this.isGeneral) {
      this.comprarService.comprarEntradaGeneral(
        this.cliente?.id!,
        this.evento?.id!,
        this.informacionTiposEntrada?.entradaOcioDTO?.id!,
        this.datosAsistentesEOC).subscribe({
        next: async value => {
          if (value.object as EntradaOcioCliente[]) {
            await loading.present();
            let compra = value.object as EntradaOcioCliente[];
            this.entradasCompradasExito = true;
            this.isModalOpen = false;
            this.pdfService.downloadPdf(compra, new ComprarReservadoDTO(), []);
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
      })
    } else if (this.isReservado) {
      this.comprarService.comprarReservado(
        this.cliente?.id!,
        this.evento?.id!,
        this.informacionTiposEntrada?.reservadoOcioDTO?.id!,
        this.datosAsistentesROC!).subscribe({
        next: async value => {
          if (value.object as ComprarReservadoDTO) {
            await loading.present();
            let compra = value.object as ComprarReservadoDTO;
            this.entradasCompradasExito = true;
            this.isModalOpen = false;
            this.pdfService.downloadPdf([], compra, []);
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
      })
    } else if (this.isLista) {
      this.comprarService.comprarLista(
        this.cliente?.id!,
        this.evento?.id!,
        this.informacionTiposEntrada?.listaOcioDTO?.id!,
        this.datosAsistentesLOC!).subscribe({
        next: async value => {
          if (value.object as ListaOcioCliente[]) {
            await loading.present();
            let compra = value.object as ListaOcioCliente[];
            this.entradasCompradasExito = true;
            this.isModalOpen = false;
            this.pdfService.downloadPdf([], new ComprarReservadoDTO(), compra);
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
      })
    }
  }

  getInfoRestantes(id: number) {
    this.eventoService.getInfoRestantes(id).subscribe({
      next: value => {
        this.cantidadesRestantes = value.object as CantidadesRestantesDTO;
        this.aforoEvento = this.cantidadesRestantes.aforoEvento;
        this.entradasVendidas = this.cantidadesRestantes.entradasVendidas;
        this.reservadosVendidos = this.cantidadesRestantes.reservadosVendidos;
        this.personasTotalesReservadosVendidos = this.cantidadesRestantes.personasTotalesReservadosVendidos;
        this.invitacionesTotalesLista = this.cantidadesRestantes.invitacionesTotalesLista;
        this.clientesApuntadosALista = this.cantidadesRestantes.clientesApuntadosALista;
        this.totalAsistentes = this.cantidadesRestantes.totalAsistentes;
        this.sePuedenComprarEntradas();
        this.sePuedenComprarReservados();
        this.sePuedenComprarListas();
      },
      error: err => {
        console.error(err);
      }
    })
  }

  sePuedenComprarEntradas() {
    this.disponiblesGeneral = this.informacionTiposEntrada?.entradaOcioDTO?.totalEntradas! - this.entradasVendidas!
    let total = this.disponiblesGeneral;

    if (total > 0) {
      for (let x = 0; x < this.disponiblesGeneral; x++) {
        if (x == 5) {
          break
        } else {
          this.disponibilidadGeneral.push(x + 1);
        }
      }
      this.comprarEntradas = true;
    } else {
      this.comprarEntradas = false;
    }
  }

  sePuedenComprarReservados() {
    this.disponiblesReservado = this.informacionTiposEntrada?.reservadoOcioDTO?.reservadosDisponibles! - this.reservadosVendidos!

    this.comprarReservado = this.disponiblesReservado > 0;
  }

  sePuedenComprarListas() {
    this.disponiblesLista = this.informacionTiposEntrada?.listaOcioDTO?.total_invitaciones! - this.clientesApuntadosALista!
    let total = this.disponiblesLista;

    if (total > 0) {
      for (let x = 0; x < this.disponiblesLista; x++) {
        if (x == 5) {
          break
        } else {
          this.disponibilidadLista.push(x + 1);
        }
      }
      this.comprarLista = true;
    } else {
      this.comprarLista = false;
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
      this.clienteService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          this.cliente = value;
        },
        error: err => {
          console.error(err);
        }
      })
    } else if (usuario.rol == "OCIONOCTURNO") {
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: async value => {
          if (value.id != this.evento?.ocioNocturnoDTO?.id) {
            this.router.navigate(["notium/error"])
            const toast = await this.toastController.create({
              message: 'Siendo gestor de ocio no puedes visualizar eventos si no eres el propietario',
              duration: 5000,
              position: 'top',
              color: 'danger'
            });
            toast.present();
          } else {
            this.permisosParaEditar = true;
          }
        },
        error: err => {
          console.error(err);
        }
      })
    } else {
      this.router.navigate(["notium/error"])
    }
  }


  openModal(b: boolean) {
    this.isModalEvento = b;
  }

  informacionEventoTotal(idEvento: number) {
    this.eventoService.getInfoEventoTotal(idEvento).subscribe({
      next: value => {
        if (value) {
          this.crearEventoDTO = value;
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }

  modificar(id: number) {
    this.getById(id);
  }

  alertDelete(b: boolean) {
    this.isDeleteOpen = b;
  }

  eliminarEvento() {
    this.eventoService.eliminarEvento(this.idEvento!).subscribe({
      next: async value => {
        if (value) {
          const toast = await this.toastController.create({
            message: 'Evento eliminado correctamente',
            duration: 4000,
            position: 'top',
            color: 'success'
          });
          toast.present();
          this.router.navigate(["notium/ocionocturno", this.evento?.ocioNocturnoDTO?.id])
        }
      },
      error: async err => {
        const toast = await this.toastController.create({
          message: 'El evento no se ha podido eliminar',
          duration: 4000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
    })
  }

  openChat() {
    if (this.evento) {
      this.dialog.open(ChatComponent, {
        data: {evento: this.evento!}
      });
    }
  }
}
