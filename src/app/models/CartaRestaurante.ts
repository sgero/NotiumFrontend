import {Restaurante} from "./Restaurante";

export class CartaRestaurante{
  id?: number;
  activo?: boolean = true;
  restaurante: Restaurante = new Restaurante();
}
