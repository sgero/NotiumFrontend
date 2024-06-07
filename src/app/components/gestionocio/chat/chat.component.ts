import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {send, menu, arrowDown, ellipsisVerticalOutline} from "ionicons/icons";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {ChatService} from "../../../services/chat.service";
import {ChatMensajeDTO} from "../../../models/ChatMensajeDTO";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {OcioNocturno} from "../../../models/OcioNocturno";

const IonIcons = {
  send,
  menu,
  arrowDown,
  ellipsisVerticalOutline
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
    MatMenu
  ],
  standalone: true
})
export class ChatComponent implements OnInit {
  message: string = '';
  esCliente?: boolean;
  idOcio: any;
  permisosParaEditar = false;
  mensajes: ChatMensajeDTO[] = [];
  mensajeSeleccionado?: ChatMensajeDTO;
  editarMensaje = false;

  constructor(
    private usuarioService: UsuarioService,
    private router : Router,
    private ocioNocturnoService : OcionocturnoService,
    private route: ActivatedRoute,
    private chatService : ChatService,
    private toastController : ToastController
  ) {
    this.idOcio = this.route.snapshot.paramMap.get('id');
    addIcons(IonIcons);
  }

  ngOnInit() {
    this.getUsuario();
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
      this.getMensajes(this.idOcio!);
    } else if (usuario.rol != "OCIONOCTURNO") {
      this.esCliente = false;
      this.router.navigate(["notium/error"])
    } else {
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          if (value.id == this.idOcio) {
            this.permisosParaEditar = true;
            this.getMensajes(value.id!);
          }
        },
        error: err => {
          console.error(err);
        }
      })
    }
  }

  getMensajes(id:number) {
    this.chatService.getMensajesByOcio(id).subscribe({
      next: value => {
        if (value){
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
        console.error(err);
      }
    })
  }

  toggleMenu(message:ChatMensajeDTO, b: boolean | undefined) {
    message.isMenuVisible = !b;
  }


  async eliminarMensaje(m: ChatMensajeDTO) {
    const toast = await this.toastController.create({
      message: 'Mensaje eliminado con éxito',
      duration: 5000,
      position: "top",
      color: "danger"
    });
    this.chatService.eliminarMensaje(m.id!).subscribe({
      next: async value => {
        await toast.present();
        this.getMensajes(this.idOcio!);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  async guardarMensaje(texto: string, idMensaje?: number,) {
    const toast = await this.toastController.create({
      message: 'Mensaje guardado con éxito',
      duration: 5000,
      position: "top",
      color: "success"
    });
    const mensaje = new ChatMensajeDTO();
    mensaje.id = idMensaje;
    mensaje.texto = texto;
    const chat = new OcioNocturno()
    chat.id = this.idOcio;
    mensaje.chatDTO = chat;
    this.chatService.guardar(mensaje).subscribe({
      next: async value => {
        this.getMensajes(this.idOcio!);
        this.message = '';
        if (this.mensajeSeleccionado){
          this.mensajeSeleccionado.texto = '';
        }
        await toast.present();
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
}
