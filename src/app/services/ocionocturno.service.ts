import {OcioNocturno} from "../models/OcioNocturno";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class OcionocturnoService {
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }
  crearOcioNocturno(ocioNocturno: OcioNocturno) {

  return this.http.post<any>(`${this.apiUrl}/ocio_nocturno/crear`, ocioNocturno);

  }
}
