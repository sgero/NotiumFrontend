import {Usuario} from "./Usuario";
import {DireccionDTO} from "./DireccionDTO";

export class Restaurante{
  id?: number;
  nombre?: string = '';
  telefono?: string = '';
  hora_apertura?: string = '';
  hora_cierre?: string = '';
  valoracion?: boolean = true;
  disponible?: boolean = true;
  imagen_marca?: string = '';
  activo?: boolean = true;
  usuarioDTO: Usuario = new Usuario();
  direccionDTO: DireccionDTO = new DireccionDTO();
}
