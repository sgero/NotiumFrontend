import {Evento} from "./Evento";
import {Rpp} from "./Rpp";
import {Consumiciones} from "./Consumiciones";

export class ListaOcio {
  id?: number;
  precio?:number;
  total_invitaciones?:number;
  eventoDTO?:Evento;
  rppDTO?:Rpp;
  detalleLista?:string;
  consumiciones?:Consumiciones;
  activo = false;
}
