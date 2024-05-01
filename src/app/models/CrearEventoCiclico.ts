import {Evento} from "./Evento";
import {EntradaOcio} from "./EntradaOcio";
import {ReservadoOcio} from "./ReservadoOcio";
import {ListaOcio} from "./ListaOcio";
import {RepetirCicloEventoOcio} from "./RepetirCicloEventoOcio";
import {DiasARepetirCicloEventoOcio} from "./DiasARepetirCicloEventoOcio";

export class CrearEventoCiclico {
  eventoDTO?:Evento;
  entradaOcioDTO?:EntradaOcio;
  reservadoOcioDTO?:ReservadoOcio;
  listaOcioDTO?:ListaOcio[];
  repetirCicloEventoOcio?:RepetirCicloEventoOcio;
  diasARepetirCicloEventoOcioList?:DiasARepetirCicloEventoOcio;
}
