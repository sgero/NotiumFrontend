import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";

export class OcioNocturno {
  id?: number;
  nombre?: string;
  cif?: string;
  telefono?: string;
  horaApertura?: string;
  horaCierre?: string;
  aforo?: number;
  imagenMarca?: string;
  usuarioDTO?: Usuario;
  direccionDTO?:Direccion;
}
