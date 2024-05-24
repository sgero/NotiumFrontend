import {Producto} from "./Producto";
import {Formato} from "./Formato";

export  class ProductoFormato{
  id?: number;
  precio?: number;
  productoDTO?: Producto = new Producto();
  formatoDTO?: Formato = new Formato();
}
