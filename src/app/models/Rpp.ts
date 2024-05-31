import {Usuario} from "./Usuario";
import {DireccionDTO} from "./DireccionDTO";
import {OcioNocturno} from "./OcioNocturno";

export class Rpp  {
  id?: number;
  nombre?: string;
  apellidos?: string;
  dni?: string;
  telefono?: string;
  fechaNacimiento?: Date;
  userDTO?: Usuario | null;
  direccionDTO?:DireccionDTO = new DireccionDTO;
  ocioNocturnoDTO?:OcioNocturno;
}
