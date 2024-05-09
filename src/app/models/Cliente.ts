import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";

export class Cliente{
  id?: number;
  nombre: string = '';
  apellidos?: string = '';
  dni?: string = '';
  telefono?: string = '';
  fecha_nacimiento?: string = '';
  ubicacion_actual?: string = '';
  usuario: Usuario = new Usuario();
  direccion: Direccion = new Direccion();
  activo?: boolean = true;
  token_verificacion?: string = '';
}
