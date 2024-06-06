import {Restaurante} from "./Restaurante";

export class Mesa{
  id?: number;
  numPlazas?: string;
  activo?: boolean = true;
  restaurante: Restaurante = new Restaurante();
}
