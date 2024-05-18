import {Evento} from "./Evento";
import {Botellas} from "./Botellas";

export class ReservadoOcio {
  id?: number;
  reservadosDisponibles?:number;
  personasMaximasPorReservado?:number;
  precio?:number;
  detalleReservado?:string;
  botellas?:Botellas;
  eventoDTO?:Evento;
}
