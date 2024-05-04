import {Restaurante} from "./Restaurante";

export class Turno{

  id?: number;
  hora_inicio?: string = '';
  hora_fin?: string = '';
  activo?: boolean = true;
  restaurante: Restaurante = new Restaurante();
}
