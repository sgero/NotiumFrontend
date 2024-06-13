import {DireccionDTO} from "./DireccionDTO";

export class UserRestaurante{
  id?: number;

  username: string = '';
  email?: string = '';
  password?: string = '';
  rol?: number;

  nombre: string = '';
  telefono?: string = '';
  cif?: string = '';
  hora_apertura?: string = '';
  hora_cierre?: string = '';
  valoracion?: boolean;
  disponible?: boolean;
  id_clase?: number;
  aforo?: number;
  imagen_marca?: string = '';
  direccionDTO: DireccionDTO = new DireccionDTO();
}
