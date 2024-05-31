import {Restaurante} from "./Restaurante";
import {Mesa} from "./Mesa";
import {Cliente} from "./Cliente";
import {Turno} from "./Turno";

export class Reserva{

  id?: number;
  numPersonas?: number;
  codigoReserva?: string;
  activo?: boolean;
  fecha?: string;
  clienteDTO?: Cliente;
  turnoDTO?: Turno;
  restauranteDTO?: Restaurante;
  mesaDTO?: Mesa;
}
