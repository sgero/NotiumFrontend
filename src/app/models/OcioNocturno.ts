import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";

export class OcioNocturno {
  id?: number;
  nombre?: string;
  cif?: string;
  horaApertura?: string;
  horaCierre?: string;
  aforo?: number;
  imagenMarca?: string;
  userDTO?: Usuario;
  direccionDTO?:Direccion;
}
