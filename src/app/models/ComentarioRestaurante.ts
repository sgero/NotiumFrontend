import {Restaurante} from "./Restaurante";
import {Cliente} from "./Cliente";
import {OcioNocturno} from "./OcioNocturno";

export class ComentarioRestaurante {
  id?: number;
  texto?: string;
  codigoReserva?: string;
  valoracion?: number;
  fecha_comentario?: string;
  restaurante: Restaurante = new Restaurante();
  clienteDTO: Cliente = new Cliente();
}
