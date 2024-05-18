import {Evento} from "./Evento";
import {EntradaOcio} from "./EntradaOcio";
import {ReservadoOcio} from "./ReservadoOcio";
import {ListaOcio} from "./ListaOcio";

export class InformacionTiposEntradasEvento{
  id?:number;
  eventoDTO?:Evento;
  entradaOcioDTO?:EntradaOcio;
  reservadoOcioDTO?:ReservadoOcio;
  listaOcioDTO?:ListaOcio;
}
