import {OcioNocturno} from "./OcioNocturno";

export class ChatMensajeDTO{
  id ?: number;
  texto ?: string;
  fecha ?: string;
  editado ?:boolean;
  chatDTO ?: OcioNocturno;
  isMenuVisible?: boolean;
}
