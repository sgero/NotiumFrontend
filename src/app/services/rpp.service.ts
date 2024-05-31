import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Rpp} from "../models/Rpp";

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

  guardarRpp(id:number, rpp : Rpp){
    return this.http.post<[number, Rpp]>(`${this.apiUrl}/rpps/guardar/${id}`, rpp);
  }

  eliminarRpp(id:number){
    return this.http.delete(`${this.apiUrl}/rpps/${id}`);
  }
}
