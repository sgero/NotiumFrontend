import {Restaurante} from "./Restaurante";
import {Mesa} from "./Mesa";
import {Cliente} from "./Cliente";
import {Turno} from "./Turno";

export class Reserva{

  id?: number;
  codigo_reserva?: string = '';
  activo?: boolean = true;
  fecha?: string = '';
  clienteDTO: Cliente = new Cliente();
  turnoDTO: Turno = new Turno();
  restauranteDTO: Restaurante = new Restaurante();
  mesaDTO: Mesa = new Mesa();
}
