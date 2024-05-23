import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RespuestaDTO} from "../models/RespuestaDTO";
import {EntradaOcioCliente} from "../models/EntradaOcioCliente";
import {ListaOcioCliente} from "../models/ListaOcioCliente";
import {ComprarReservadoDTO} from "../models/ComprarReservadoDTO";

@Injectable({
  providedIn: 'root'
})
export class ComprarService{
  private apiUrl = 'http://127.0.0.1:8080/comprar';
  constructor(private http: HttpClient) { }

  comprarEntradaGeneral(params:any, idEvento:number, idEntradaOcio:number, entradasOcioClienteLista: EntradaOcioCliente[]){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/entrada/${idEntradaOcio}`, entradasOcioClienteLista,{params:httpParams});
  }

  comprarReservado(params:any, idEvento:number, idReservadoOcio:number, comprarReservadoDTO: ComprarReservadoDTO){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/entrada/${idReservadoOcio}`, comprarReservadoDTO,{params:httpParams});
  }

  comprarLista(params:any, idEvento:number, idListaOcio:number, listaOcioClienteDTOS: ListaOcioCliente[]){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/entrada/${idListaOcio}`, listaOcioClienteDTOS,{params:httpParams});
  }

}
