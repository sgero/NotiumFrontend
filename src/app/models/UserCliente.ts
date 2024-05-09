import {Direccion} from "./Direccion";

export class UserCliente{
  id?: number;

  username: string = '';
  email?: string = '';
  password?: string = '';
  rol?: number;

  nombre: string = '';
  apellidos?: string = '';
  dni?: string = '';
  telefono?: string = '';
  fecha_nacimiento?: string = '';
  ubicacion_actual?: string = '';
  direccion: Direccion = new Direccion();
  activo?: boolean = true;
  token_verificacion?: string = '';
}
