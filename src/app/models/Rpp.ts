import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";
import {OcioNocturno} from "./OcioNocturno";

export class Rpp  {
  id?: number;
  nombre?: string;
  apellidos?: string;
  dni?: string;
  telefono?: string;
  fecha_nacimiento?: number;
  userDTO?: Usuario | null;
  direccionDTO?:Direccion | null;
  ocioNocturnoDTO?:OcioNocturno;
}
