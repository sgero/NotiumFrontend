import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Rpp} from "../models/Rpp";
import {OcioNocturno} from "../models/OcioNocturno";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})

export class RppService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  listarRpp(){
    return this.http.get<Rpp[]>(`${this.apiUrl}/rpps/listar`)
  }

  rppPorId(id: number){
    return this.http.get<Rpp>(`${this.apiUrl}/rpps/${id}`)
  }

  rppsByOcio(id:number){
    return this.http.get<Rpp[]>(`${this.apiUrl}/rpps/listarByOcio/${id}`);
  }

  guardarRpp(rpp : Rpp){
    return this.http.post<Rpp>(`${this.apiUrl}/rpps/guardar`, rpp);
  }

  eliminarRpp(id:number){
    return this.http.delete(`${this.apiUrl}/rpps/${id}`);
  }
}
