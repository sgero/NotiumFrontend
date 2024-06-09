import {OcioNocturno} from "./OcioNocturno";
import {Evento} from "./Evento";

export class ChatMensajeDTO{
  id ?: number;
  texto ?: string;
  fecha ?: string;
  editado ?:boolean;
  ocioNocturnoDTO ?: OcioNocturno;
  chatEventoDTO ?:Evento
  isMenuVisible?: boolean;
}
