import {Component, OnInit} from '@angular/core';
import {Reserva} from "../../models/Reserva";
import {EntradaOcio} from "../../models/EntradaOcio";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {EventoService} from "../../services/evento.service";
import {UsuarioService} from "../../services/usuario.service";
import {Router, RouterLink} from "@angular/router";
import {ClienteService} from "../../services/cliente.service";
import {ClienteEntradasCompradasDTO} from "../../models/ClienteEntradasCompradasDTO";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PdfService} from "../../services/pdf.service";
import {EntradaOcioCliente} from "../../models/EntradaOcioCliente";
import {ListaOcioCliente} from "../../models/ListaOcioCliente";
import {ComprarReservadoDTO} from "../../models/ComprarReservadoDTO";
import {ReservadoOcioCliente} from "../../models/ReservadoOcioCliente";
import {ChatComponent} from "../gestionocio/chat/chat.component";
import {Evento} from "../../models/Evento";
import {MatDialog} from "@angular/material/dialog";
import {ValoacionOcioComponent} from "../gestionocio/valoacion-ocio/valoacion-ocio.component";
import {Cliente} from "../../models/Cliente";
import {ReservaService} from "../../services/reserva.service";
import {SharedService} from "../../services/SharedService";
import {HacerValoracionComponent} from "../restaurante/hacer-valoracion/hacer-valoracion.component";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-mis-tickets-reservas',
  templateUrl: './mis-tickets-reservas.component.html',
  styleUrls: ['./mis-tickets-reservas.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatProgressSpinner,
    RouterLink
  ],
  standalone: true
})
export class MisTicketsReservasComponent  implements OnInit {

  reservasTiempo: Reserva[] = [];
  id_usuario: any;
  reservas: Reserva[] = [];
  entradasCompradas ?: ClienteEntradasCompradasDTO;
  restaurante?: boolean;
  estado_reserva: string = '';
  titulo_estado: boolean = false;
  ePasadas = false;
  eFuturas = false;
  rPasados = false;
  rFuturos = false;
  lPasadas = false;
  lFuturos = false;
  cliente!: Cliente;
  rPasadas = false;
  rFuturas = false;
  fechaFormateada: any;


  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private clienteService: ClienteService,
    private pdfService: PdfService,
    public dialog: MatDialog,
    private reservaService: ReservaService,
    private sharedService: SharedService,
    private dialogRef: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getUsuario();

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
    this.id_usuario = usuario.id;
    if (usuario.rol == "CLIENTE") {
      this.clienteService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          if (value) {
            this.cliente = value;
            this.getEntradasCliente(value.id!);
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

  getEntradasCliente(id: number) {
    this.eventoService.entradasCompradasByIdCliente(id).subscribe({
      next: value => {
        if (value) {
          this.entradasCompradas = value;
          this.entradasCompradas?.entradasGeneralesCompradasPasadas!.forEach(m => {
            const fechaString = m.entradaOcioDTO?.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.entradaOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
          this.entradasCompradas?.entradasGeneralesCompradasFuturas!.forEach(m => {
            const fechaString = m.entradaOcioDTO?.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.entradaOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
          this.entradasCompradas?.reservadosCompradosPasados!.forEach(m => {
            const fechaString = m.reservadoOcioClienteDTO.reservadoOcioDTO!.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.reservadoOcioClienteDTO.reservadoOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
          this.entradasCompradas?.reservadosCompradosFuturos!.forEach(m => {
            const fechaString = m.reservadoOcioClienteDTO.reservadoOcioDTO!.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.reservadoOcioClienteDTO.reservadoOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
          this.entradasCompradas?.listasCompradasPasadas!.forEach(m => {
            const fechaString = m.listaOcioDTO!.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.listaOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
          this.entradasCompradas?.listasCompradasFuturas!.forEach(m => {
            const fechaString = m.listaOcioDTO!.eventoDTO!.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.listaOcioDTO!.eventoDTO!.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }

  verRestaurante(b: boolean) {
    this.restaurante = b;
  }

  actualizar(s: string) {
    if (s == 'ep') {
      this.ePasadas = true;
      this.eFuturas = false;
      this.rPasados = false;
      this.rFuturos = false;
      this.lPasadas = false;
      this.lFuturos = false;
    } else if (s == 'ef') {
      this.ePasadas = false;
      this.eFuturas = true;
      this.rPasados = false;
      this.rFuturos = false;
      this.lPasadas = false;
      this.lFuturos = false;
    } else if (s == 'rp') {
      this.ePasadas = false;
      this.eFuturas = false;
      this.rPasados = true;
      this.rFuturos = false;
      this.lPasadas = false;
      this.lFuturos = false;
    } else if (s == 'rf') {
      this.ePasadas = false;
      this.eFuturas = false;
      this.rPasados = false;
      this.rFuturos = true;
      this.lPasadas = false;
      this.lFuturos = false;
    } else if (s == 'lp') {
      this.ePasadas = false;
      this.eFuturas = false;
      this.rPasados = false;
      this.rFuturos = false;
      this.lPasadas = true;
      this.lFuturos = false;
    } else if (s == 'lf') {
      this.ePasadas = false;
      this.eFuturas = false;
      this.rPasados = false;
      this.rFuturos = false;
      this.lPasadas = false;
      this.lFuturos = true;
    }
  }

  descargarPdfEntradas(x: EntradaOcioCliente) {
    this.pdfService.downloadPdf([x], new ComprarReservadoDTO(), []);
  }

  descargarPdfReservados(x: ComprarReservadoDTO) {
    this.pdfService.downloadPdf([], x, []);
  }

  descargarPdfListas(x: ListaOcioCliente) {
    this.pdfService.downloadPdf([], new ComprarReservadoDTO(), [x]);
  }

  openChat(evento: Evento) {
    if (evento) {
      this.dialog.open(ChatComponent, {
        data: {evento: evento!}
      });
    }
  }

  openValorar(evento: Evento, codigo: string) {
    if (evento && codigo && this.cliente) {
      this.dialog.open(ValoacionOcioComponent, {
        data: {
          evento: evento!,
          codigoValoracion: codigo!,
          cliente: this.cliente
        }
      });
    }
  }



  reserv(estado: string) {

    this.estado_reserva = estado;
    this.titulo_estado = true;

    if (estado == 'pasadas') {
      this.rPasadas = true;
      this.rFuturas = false;

      this.reservaService.getReservaUser(this.id_usuario, estado).subscribe({
        next: (data) => {
          this.reservasTiempo = data;
        },
        error: (error) => {
          console.error('Error al obtener las reservas pasadas', error);
        },
        complete: () => {
          console.log('Las reservas pasadas:', this.reservasTiempo);
        }
      });


    } else if (estado == 'futuras') {
      this.rPasadas = false;
      this.rFuturas = true;

      this.reservaService.getReservaUser(this.id_usuario, estado).subscribe({
        next: (data) => {
          this.reservasTiempo = data;
        },
        error: (error) => {
          console.error('Error al obtener las reservas futuras:', error);
        },
        complete: () => {
          console.log('Las reservas futuras:', this.reservasTiempo);
        }
      });

    }
  }

  abrirModalValoraciones(id: any) {

    const dialogRef = this.dialogRef.open(HacerValoracionComponent,{
      data: {id_restaurante:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chat cerrado');
    });
  }

  generarPDFReserva(reserva: Reserva) {

    this.fechaFormateada = this.getFormattedDate(reserva.fecha);

    const reservaPDF = {
      fecha: this.fechaFormateada,
      numPersonas: reserva.numPersonas,
      turnoDTO: reserva.turnoDTO,
      restauranteDTO: { id: reserva.restauranteDTO?.id },
      usuarioDTO: { id: reserva.restauranteDTO?.id }
    };
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Reserva', 14, 22);

    // Datos de la reserva en columnas
    const columns = ['Campo', 'Valor'];
    const rows = [
      ['Código de Reserva', reserva.codigoReserva ?? ''],
      ['Fecha', reserva.fecha ?? ''],
      ['Número de Personas', reserva.numPersonas ?? ''],
      ['Turno', (reserva.turnoDTO?.hora_inicio ?? '') + " a " + (reserva.turnoDTO?.hora_fin ?? '')],
      ['Restaurante', reserva.restauranteDTO?.nombre ?? ''],
      ['Usuario', (reserva.clienteDTO?.nombre ?? '') + " " + (reserva.clienteDTO?.apellidos ?? '')]
    ];

    // Generar la tabla
    autoTable(doc, {
      startY: 30,
      head: [columns],
      body: rows as unknown as any[][]
    });

    // Guardar el PDF
    doc.save('Justificante-reserva.pdf');
  }


  getFormattedDate(date: any): string {
    const fecha = date;
    if (fecha) {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}-${month}-${year}`;
    }
    return '';
  }


}
