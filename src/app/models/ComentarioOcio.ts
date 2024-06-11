import {Cliente} from "./Cliente";
import {OcioNocturno} from "./OcioNocturno";

export class ComentarioOcio{
  id?: number;
  texto?: string;
  codigoReserva?: string;
  valoracion?: number;
  fecha_comentario?: string;
  ocio: OcioNocturno = new OcioNocturno();
  clienteDTO: Cliente = new Cliente();
}
