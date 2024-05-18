import {Cliente} from "./Cliente";
import {Promocion} from "./Promocion";
import {DatosComprador} from "./DatosComprador";
import {ListaOcio} from "./ListaOcio";

export class ListaOcioCliente{
  id?:number;
  codigo?:string;
  fecha?:string;
  clienteDTO?:Cliente;
  listaOcioDTO?:ListaOcio;
  promocionDTO?:Promocion;
  datosCompradorDTO?:DatosComprador;
}
