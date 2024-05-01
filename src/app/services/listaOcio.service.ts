import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})
export class ListaOcioService{
  private apiUrl = 'http://127.0.0.1:8000/api';
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

  eliminarLista(id: number){
    return this.http.delete<RespuestaDTO>(`${this.apiUrl}/listasOcio/${id}`);
  }

}
