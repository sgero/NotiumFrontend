import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {IonicModule, IonModal} from "@ionic/angular";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ActivatedRoute} from "@angular/router";
import {Evento} from "../../models/Evento";
import {EventoService} from "../../services/evento.service";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RppService} from "../../services/rpp.service";
import {Rpp} from "../../models/Rpp";
import {ListaOcio} from "../../models/ListaOcio";
import {ListaOcioService} from "../../services/listaOcio.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {Direccion} from "../../models/Direccion";
import {Usuario} from "../../models/Usuario";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";

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
    MatDatepickerModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatSort,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    NgOptimizedImage
  ],
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
})
export class GestionocioComponent  implements OnInit {

  displayedColumns: string[] = ['imagen', 'nombre', 'opciones'];
  dataSource: MatTableDataSource<Rpp> = new MatTableDataSource<Rpp>();
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  eventosInfo: string = 'string';
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
  datosEvento = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    tematica: ['', Validators.required],
    fecha: ['', Validators.required],
    codigoVestimentaOcio: ['', Validators.required],
    edadMinimaOcio: ['', Validators.required],
    aforo: ['', Validators.required],
    cartel: ['', Validators.required],
    ocioNocturnoDTO: ['', Validators.required],
  });
  unico = true;
  vestimentas: string[] = Object.keys(CodigoVestimentaOcio).filter(key => isNaN(Number(key))) as string[];
  edadMinima: string[] = Object.keys(EdadMinimaOcio).filter(key => isNaN(Number(key))) as string[];
  constructor(
    private ocioNocturnoService : OcionocturnoService,
    private eventoService : EventoService,
    private rppService : RppService,
    private listaService : ListaOcioService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartaOcioService: CartaOcioService,
  ) {
    addIcons(IonIcons);
    this.newRpp.direccionDTO = new Direccion();
    this.newRpp.userDTO = new Usuario();
  }

  ngOnInit() {
    this.getOcio()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
            this.dataSource.data = this.rpps;

          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getListas(id:number){
        this.listaService.getByRppId(id).subscribe({
          next: value => {
            this.listas = value as ListaOcio[];
            console.log("listas del rpp con id"+id)
          },
          error: e => {
            console.error(e);
          }
        })
  }


  deleteRpp(id: number): void {
    this.rppService.eliminarRpp(id).subscribe({
      next: value => {
        this.rppDeleted = value as Rpp;
        this.rpps = this.rpps.filter(r => r.id !== id);
        this.dataSource.data = this.rpps;
      },
      error: e => {
        console.error(e);
      }
    });
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

  openM(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  eventoUnico(b: boolean) {
    this.unico = b;
  }
}




