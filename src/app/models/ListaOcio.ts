import {Evento} from "./Evento";
import {Rpp} from "./Rpp";

export class ListaOcio {
  id?: number;
  precio?:number;
  total_invitaciones?:number;
  eventoDTO?:Evento;
  rppDTO?:Rpp;
}
