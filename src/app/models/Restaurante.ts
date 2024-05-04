import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";

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
  usuario: Usuario = new Usuario();
  direccion: Direccion = new Direccion();
}
