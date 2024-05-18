import {Evento} from "./Evento";
import {Consumiciones} from "./Consumiciones";

export class EntradaOcio {
  id?: number;
  precio?:number;
  detalleEntrada?:string;
  consumiciones?:Consumiciones;
  totalEntradas?:number;
  eventoDTO?:Evento;
}
