import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CrearEvento} from "../models/CrearEvento";
import {CrearEventoCiclico} from "../models/CrearEventoCiclico";
import {RespuestaDTO} from "../models/RespuestaDTO";
import {OcioNocturno} from "../models/OcioNocturno";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/listarTodos`);
  }

  getById(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/${id}`);
  }
  getAllByOcio(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/listarByOcio/${id}`);
  }


  getInfoEntradas(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/${id}/entradas`);
  }

  getInfoEventoTotal(id:number){
    return this.http.get<CrearEvento>(`${this.apiUrl}/eventos/info/${id}`);
  }

  getActivos(params:any){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/activos`, {params:httpParams});
  }

  entreDosFechas(params:any){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/fechas`, {params:httpParams});
  }

  entreDosFechasConIdOcio(params:any){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/fechas`, {params:httpParams});
  }

  guardarEvento(eventoData: CrearEvento){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/eventos/guardar`, eventoData);
  }

  crearEventoCiclico(eventoData: CrearEventoCiclico){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/eventos/crearCiclo`, eventoData);
  }

  eliminarEvento(id: number){
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/eventos/eliminar`, id);
  }

  getInfoRestantes(id:number){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/restante/${id}`);
  }

}
