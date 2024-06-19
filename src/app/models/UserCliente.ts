import {DireccionDTO} from "./DireccionDTO";

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
  fechaNacimiento?: string = '';
  ubicacion_actual?: string = '';
  direccionDTO: DireccionDTO = new DireccionDTO();
  activo?: boolean = true;
  token_verificacion?: string = '';
}
