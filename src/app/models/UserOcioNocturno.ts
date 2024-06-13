import {DireccionDTO} from "./DireccionDTO";

export class UserOcioNocturno{
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
  aforo?: number;
  imagen_marca?: string = '';
  direccionDTO: DireccionDTO = new DireccionDTO();
}
