import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";

export class OcioNocturno {
  id?: number;
  nombre?: string;
  cif?: string;
  telefono?: string;
  hora_apertura?: string;
  hora_cierre?: string;
  aforo?: number;
  imagen_arca?: string;
  usuario?: Usuario;
  direccion?:Direccion;
}
