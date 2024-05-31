import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserOcioNocturno} from "../models/UserOcioNocturno";
import {OcioNocturno} from "../models/OcioNocturno";

@Injectable({
  providedIn: 'root'
})

export class OcionocturnoService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) { }

  crearOcioNocturno(userOcioNocturno: UserOcioNocturno) {

  return this.http.post<any>(`${this.apiUrl}/ocio_nocturno/crear`, UserOcioNocturno);

  }

  listarOcioNocturno(){
    return this.http.get<OcioNocturno[]>(`${this.apiUrl}/ocioNocturno/listar`);
  }

  ocioPorId(id: number){
    return this.http.get<OcioNocturno>(`${this.apiUrl}/ocioNocturno/${id}`)
  }

  getByIdUsuario(idUsuario:number){
    return this.http.get<OcioNocturno>(`${this.apiUrl}/ocioNocturno/usuario/${idUsuario}`);
  }
}
