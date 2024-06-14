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
  horaApertura?: string = '';
  horaCierre?: string = '';
  aforo?: number;
  imagenMarca?: string = '';
  direccionDTO: DireccionDTO = new DireccionDTO();
}
