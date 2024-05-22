import {Genero} from "./Genero";
import {ReservadoOcioCliente} from "./ReservadoOcioCliente";

export class DatosComprador{
  id?:number;
  nombre?:string;
  apellidos?:string;
  email?:string;
  telefono?:string;
  fecha?:string;
  genero?:string;
  reservadoOcioClienteDTO?:ReservadoOcioCliente;
}
