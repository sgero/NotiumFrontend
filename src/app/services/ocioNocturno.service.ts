import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CrearEvento} from "../models/CrearEvento";
import {CrearEventoCiclico} from "../models/CrearEventoCiclico";
import {RespuestaDTO} from "../models/RespuestaDTO";
import {OcioNocturno} from "../models/OcioNocturno";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OcioNocturnoService{
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/listarTodos`);
  }

  crearOcioNocturno(ocioNocturno: OcioNocturno){

    return this.http.post<any>(`${this.apiUrl}/ocio_nocturno/crear`, ocioNocturno);

  }

  getActivos(){
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/eventos/activos`);
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
