import {Restaurante} from "./Restaurante";
import {DiasARepetirCicloEventoOcio} from "./DiasARepetirCicloEventoOcio";

export class Turno{

  id?: number;
  hora_inicio?: string = '';
  hora_fin?: string = '';
  restauranteDTO: Restaurante = new Restaurante();

}
