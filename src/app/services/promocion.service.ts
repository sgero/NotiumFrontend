import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Promocion} from "../models/Promocion";

@Injectable({
  providedIn: 'root'
})


export class PromocionService{
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }

  getActivas(){
    return this.http.get<Promocion[]>(`${this.apiUrl}/promocion`);
  }
}
