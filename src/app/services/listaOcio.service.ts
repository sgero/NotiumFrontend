import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RespuestaDTO} from "../models/RespuestaDTO";
import {ListaOcio} from "../models/ListaOcio";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListaOcioService{
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }

  getActivos(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/listasOcio/listar`);
  }

  getById(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/listasOcio/${id}`);
  }

  getByEventoId(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/listasOcio/evento/${id}`);
  }

  getByRppId(id:number){
    return this.http.get<ListaOcio[]>(`${this.apiUrl}/listasOcio/rpp/${id}`);
  }

  eliminarLista(id: number){
    return this.http.delete<RespuestaDTO>(`${this.apiUrl}/listasOcio/${id}`);
  }

  reasignarListas(idRppOriginal: number, idRppDestino: number): Observable<void> {
    const params = new HttpParams()
      .set('idRppOriginal', idRppOriginal.toString())
      .set('idRppDestino', idRppDestino.toString());

    return this.http.post<void>(`${this.apiUrl}/listasOcio/reasignar`, params);
  }

}
