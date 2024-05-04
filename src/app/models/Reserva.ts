import {Restaurante} from "./Restaurante";
import {Mesa} from "./Mesa";
import {Cliente} from "./Cliente";
import {Turno} from "./Turno";

export class Reserva{

  id?: number;
  codigo_reserva?: string = '';
  activo?: boolean = true;
  cliente: Cliente = new Cliente();
  turno: Turno = new Turno();
  restaurante: Restaurante = new Restaurante();
  mesa: Mesa = new Mesa();
}
