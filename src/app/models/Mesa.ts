import {Restaurante} from "./Restaurante";

export class Mesa{
  id?: number;
  num_plazas?: string;
  activo?: boolean = true;
  restaurante: Restaurante = new Restaurante();
}
