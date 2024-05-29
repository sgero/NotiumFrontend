import {Restaurante} from "./Restaurante";
import {Mesa} from "./Mesa";
import {Cliente} from "./Cliente";
import {Turno} from "./Turno";

export class Reserva{

  id?: number; // Identificador opcional de la reserva
  numPersonas?: number; // Número de personas para la reserva
  codigoReserva?: string; // Código de reserva generado
  activo?: boolean; // Estado de activo/inactivo de la reserva
  fecha?: string; // Fecha de la reserva en formato de cadena (ISO 8601)
  clienteDTO?: Cliente; // DTO del cliente asociado a la reserva
  turnoDTO?: Turno; // DTO del turno seleccionado para la reserva
  restauranteDTO?: Restaurante; // DTO del restaurante donde se realiza la reserva
  mesaDTO?: Mesa; // DTO de la mesa asignada para la reserva (opcional)
}
