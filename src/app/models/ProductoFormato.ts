import {Producto} from "./Producto";
import {Formato} from "./Formato";

export  class ProductoFormato{
  id?: number;
  precio?: number;
  producto?: Producto = new Producto();
  formato?: Formato = new Formato();
}
