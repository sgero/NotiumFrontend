import {AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {alert, arrowDown, ellipsisVerticalOutline, menu, send} from "ionicons/icons";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {ChatService} from "../../../services/chat.service";
import {ChatMensajeDTO} from "../../../models/ChatMensajeDTO";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {OcioNocturno} from "../../../models/OcioNocturno";
import {Evento} from "../../../models/Evento";
import {EventoService} from "../../../services/evento.service";
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

const IonIcons = {
  send,
  menu,
  arrowDown,
  ellipsisVerticalOutline,
  alert
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    MatMenuTrigger,
    MatButton,
    MatMenuItem,
    MatMenu,
    HeaderComponent,
    FooterComponent,
    MatIconModule
  ],
  standalone: true
})
export class ChatComponent implements OnInit, AfterViewChecked {
  message: string = '';
  esCliente?: boolean;
  permisosParaEditar = false;
  mensajes: ChatMensajeDTO[] = [new ChatMensajeDTO()];
  mensajeSeleccionado?: ChatMensajeDTO;
  editarMensaje = false;
  evento?: Evento;
  @ViewChild('scrollContainer') private myScrollContainer!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private ocioNocturnoService: OcionocturnoService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private toastController: ToastController,
    private eventoService: EventoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    addIcons(IonIcons);
  }

  ngOnInit() {
    this.getEvento(this.data.evento.id!)
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        if (value) {
          this.getDTO(value);
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getDTO(usuario: any) {
    if (usuario.rol == "CLIENTE") {
      this.esCliente = true;
      this.permisosParaEditar = false;
      this.getMensajes(this.data.evento.id!);
    } else if (usuario.rol != "OCIONOCTURNO") {
      this.esCliente = false;
      this.router.navigate(["notium/error"])
    } else {
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          if (value.id == this.evento?.ocioNocturnoDTO?.id) {
            this.permisosParaEditar = true;
            this.getMensajes(this.data.evento.id!);
          }
        },
        error: err => {
          console.error(err);
        }
      })
    }
  }

  getMensajes(id: number) {
    this.chatService.getMensajesByEvento(id).subscribe({
      next: value => {
        if (value) {
          this.mensajes = value.reverse();
          this.mensajes.forEach(m => {
            const fechaString = m.fecha;
            const fecha = new Date(fechaString!);
            const opcionesFormato: Intl.DateTimeFormatOptions = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
            m.fecha = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
          });
        }
      },
      error: err => {
        this.mensajes = [];
        console.error(err);
      }
    })
  }

  toggleMenu(message: ChatMensajeDTO, b: boolean | undefined) {
    message.isMenuVisible = !b;
  }


  eliminarMensaje(m: ChatMensajeDTO) {
    this.chatService.eliminarMensaje(m.id!).subscribe({
      next: value => {
        this.getMensajes(this.data.evento.id!);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  guardarMensaje(texto: string, idMensaje?: number,) {
    const mensaje = new ChatMensajeDTO();
    mensaje.id = idMensaje;
    mensaje.texto = texto;
    const ocioNocturno = new OcioNocturno()
    ocioNocturno.id = this.evento?.ocioNocturnoDTO?.id;
    mensaje.ocioNocturnoDTO = ocioNocturno;
    const chatEvento = new Evento();
    chatEvento.id = this.data.evento.id!;
    mensaje.chatEventoDTO = chatEvento;
    this.chatService.guardar(mensaje).subscribe({
      next: value => {
        this.getMensajes(this.data.evento.id!);
        this.message = '';
        if (this.mensajeSeleccionado) {
          this.mensajeSeleccionado.texto = '';
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }


  editar(m: ChatMensajeDTO) {
    this.editarMensaje = true;
    this.mensajeSeleccionado = m;
    this.message = m.texto!;
  }

  getEvento(id: number) {
    this.eventoService.getById(id).subscribe({
      next: value => {
        this.evento = value.object as Evento;
      }
    });
    this.getUsuario();
  }

}
