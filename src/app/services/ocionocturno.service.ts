import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserOcioNocturno} from "../models/UserOcioNocturno";

@Injectable({
  providedIn: 'root'
})

export class OcionocturnoService {
  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }
  crearOcioNocturno(userOcioNocturno: UserOcioNocturno) {

  return this.http.post<any>(`${this.apiUrl}/ocio_nocturno/crear`, UserOcioNocturno);

  }
}
