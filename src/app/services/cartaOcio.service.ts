import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CartaOcio} from "../models/CartaOcio";
import {Producto} from "../models/Producto";
import {Token} from "../models/Token";

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
  guardarCarta(id:number, cartaOcio : CartaOcio){
    return this.http.post<CartaOcio>(`${this.apiUrl}/cartasOcio/guardar/${id}`, cartaOcio);
  }
  eliminarCarta(id:number){
    return this.http.delete<CartaOcio>(`${this.apiUrl}/cartasOcio/${id}`);
  }

  crearProducto(producto: Producto){
    return this.http.post<Producto>(this.apiUrl+"/producto/crear",producto)
  }
//TODO aqui debo comprobar q los productos qme mande pertenezcan a la cartaOcio asociada al ocioNocturno
  listarProducto(producto: Token){
    return this.http.post<Producto[]>(this.apiUrl+"/producto/listar",producto)
  }

}
