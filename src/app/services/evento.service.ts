import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CrearEvento} from "../models/CrearEvento";
import {CrearEventoCiclico} from "../models/CrearEventoCiclico";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/listarTodos`);
  }

  getActivos(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/activos`);
  }

  entreDosFechas(params:any){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/fechas`, {params:httpParams});
  }

  entreDosFechasConIdOcio(idOcio:number, fechaInicio:Date, fechaFin:Date){
    const datos = {
      idOcio: idOcio,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/eventos/fechasYOcio`, datos);
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

}
