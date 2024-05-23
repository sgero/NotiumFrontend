import {ReservadoOcioCliente} from "./ReservadoOcioCliente";
import {DatosComprador} from "./DatosComprador";

export class ComprarReservadoDTO{
  reservadoOcioClienteDTO?:ReservadoOcioCliente;
  datosCompradorDTOS?:DatosComprador[];
}
