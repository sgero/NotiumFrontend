import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Promocion} from "../models/Promocion";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})


export class PromocionService{
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }

  getActivas(){
    return this.http.get<Promocion[]>(`${this.apiUrl}/promocion`);
  }

  verificarCodigo(idPromocion:number, params:any){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/promocion/${idPromocion}/verificarCodigo`, {params:httpParams});
  }


}
