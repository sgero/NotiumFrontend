import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  comprarEntradaGeneral(idCliente:number, idEvento:number, idEntradaOcio:number, entradasOcioClienteLista: EntradaOcioCliente[]){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/entrada/${idEntradaOcio}?idCliente=${idCliente}`, entradasOcioClienteLista,);
  }

  comprarReservado(idCliente:number, idEvento:number, idReservadoOcio:number, comprarReservadoDTO: ComprarReservadoDTO){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/reservado/${idReservadoOcio}?idCliente=${idCliente}`, comprarReservadoDTO);
  }

  comprarLista(idCliente:number, idEvento:number, idListaOcio:number, listaOcioClienteDTOS: ListaOcioCliente[]){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/${idEvento}/lista/${idListaOcio}?idCliente=${idCliente}`, listaOcioClienteDTOS);
  }

}
