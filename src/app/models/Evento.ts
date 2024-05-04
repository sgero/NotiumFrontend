import {OcioNocturno} from "./OcioNocturno";
import {CodigoVestimentaOcio} from "./CodigoVestimentaOcio";
import {EdadMinimaOcio} from "./EdadMinimaOcio";

export class Evento {
  id?: number;
  nombre?: string;
  descripcion?: string;
  tematica?: string;
  fecha?: string;
  aforo?: number;
  codigoVestimentaOcio?: CodigoVestimentaOcio;
  edadMinimaOcio?: EdadMinimaOcio;
  ocioNocturnoDTO?:OcioNocturno;
}
