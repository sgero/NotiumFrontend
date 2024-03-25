import {Usuario} from "./Usuario";

export class Cliente{
  id?: number;
  nombre: string = '';
  apellidos?: string = '';
  dni?: string = '';
  fecha_nacimiento?: string = '';
  ubicacion_actual?: string = '';
  usuario: Usuario = new Usuario();
  activo?: boolean = true;
}
