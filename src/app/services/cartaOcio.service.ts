import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartaOcio} from "../models/CartaOcio";
import {Producto} from "../models/Producto";
import {Token} from "../models/Token";
import {ProductoFormato} from "../models/ProductoFormato";
import {OcioNocturno} from "../models/OcioNocturno";

@Injectable({
  providedIn: 'root'
})

export class CartaOcioService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  cartaByOcio(idOcio:number){
    return this.http.get<CartaOcio>(`${this.apiUrl}/cartasOcio/listarByOcio${idOcio}`);
  }
  guardarCarta(cartaOcio : OcioNocturno){
    return this.http.post<CartaOcio>(`${this.apiUrl}/cartasOcio/guardar`, cartaOcio);
  }
  eliminarCarta(id:number){
    return this.http.delete<CartaOcio>(`${this.apiUrl}/cartasOcio/${id}`);
  }

  crearProducto(producto: Producto,token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<Producto>(this.apiUrl+"/producto/guardar",producto, { headers: headers })
  }

  listarProductos(token: string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<ProductoFormato[]>(`${this.apiUrl}/producto/listarTodos`, {}, { headers });
  }

  crearProductoFormato(productoFormato: ProductoFormato){
    return this.http.post<ProductoFormato>(this.apiUrl+"/productoFormato/crear", productoFormato)
  }

  listarFormatos(token: string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<ProductoFormato[]>(`${this.apiUrl}/productoFormato/listarTodos`, {}, { headers });
  }
  listarFormatosCliente(username: Token){
    return this.http.post<ProductoFormato[]>(`${this.apiUrl}/productoFormato/listarTodosCliente`, username);
  }

  eliminarProducto(id: number){
    return this.http.delete(this.apiUrl+`/producto/eliminar/${id}` )
  }

  productoById(id: number){
    return this.http.get<Producto>(this.apiUrl+`/producto/${id}` )
  }

  productoFormatoById(id: number){
    return this.http.get<ProductoFormato>(this.apiUrl+`/productoFormato/${id}` )
  }

}
