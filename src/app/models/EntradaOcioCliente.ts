import {Cliente} from "./Cliente";
import {EntradaOcio} from "./EntradaOcio";
import {Promocion} from "./Promocion";
import {DatosComprador} from "./DatosComprador";

export  class EntradaOcioCliente{
  id?:number;
  codigo?:string;
  fechaCompra?:string;
  clienteDTO?:Cliente;
  entradaOcioDTO?:EntradaOcio;
  promocionDTO?:Promocion;
  datosCompradorDTO?:DatosComprador;
}
