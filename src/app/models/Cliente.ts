import {Usuario} from "./Usuario";
import {DireccionDTO} from "./DireccionDTO";

export class Cliente{
  id?: number;
  nombre: string = '';
  apellidos?: string = '';
  dni?: string = '';
  telefono?: string = '';
  fecha_nacimiento?: string = '';
  ubicacion_actual?: string = '';
  usuario: Usuario = new Usuario();
  direccion: DireccionDTO = new DireccionDTO();
  activo?: boolean = true;
  token_verificacion?: string = '';
}
