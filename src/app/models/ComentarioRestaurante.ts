import {Restaurante} from "./Restaurante";

export class ComentarioRestaurante {
  id?: number;
  texto?: string;
  codigoReserva?: string;
  valoracion?: number;
  restaurante: Restaurante = new Restaurante();


}
