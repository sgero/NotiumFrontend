import {Usuario} from "./Usuario";
import {DireccionDTO} from "./DireccionDTO";

export class OcioNocturno {
  id?: number;
  nombre?: string;
  cif?: string;
  telefono?: string;
  horaApertura?: string;
  horaCierre?: string;
  aforo?: number;
  imagen_arca?: string;
  usuarioDTO?: Usuario;
  direccionDTO?:DireccionDTO = new DireccionDTO();
}
