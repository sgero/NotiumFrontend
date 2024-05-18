import {Cliente} from "./Cliente";
import {ReservadoOcio} from "./ReservadoOcio";
import {Promocion} from "./Promocion";

export class ReservadoOcioCliente{
  id?:number;
  codigo?:string;
  fecha_compra?:string
  cantidad_personas?:number;
  clienteDTO?:Cliente;
  reservadoOcioDTO?:ReservadoOcio;
  promocionDTO?:Promocion
}
