import {Evento} from "./Evento";

export class ReservadoOcio {
  id?: number;
  reservadosDisponibles?:number;
  personasMaximasPorReservado?:number;
  precio?:number;
  eventoDTO?:Evento;
}
