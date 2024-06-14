import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserOcioNocturno} from "../models/UserOcioNocturno";
import {OcioNocturno} from "../models/OcioNocturno";
import {Observable} from "rxjs";
import {ComentarioOcio} from "../models/ComentarioOcio";

@Injectable({
  providedIn: 'root'
})

export class OcionocturnoService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  crearOcioNocturno(userOcioNocturno: UserOcioNocturno) {

    return this.http.post<any>(`${this.apiUrl}/ocioNocturno/crear`, userOcioNocturno);

  }

  listarOcioNocturno() {
    return this.http.get<OcioNocturno[]>(`${this.apiUrl}/ocioNocturno/listar`);
  }

  ocioPorId(id: number) {
    return this.http.get<OcioNocturno>(`${this.apiUrl}/ocioNocturno/${id}`)
  }

  ocioPorIdEvento(id: number) {
    return this.http.get<OcioNocturno>(`${this.apiUrl}/ocioNocturno/${id}/evento`)
  }

  getByIdUsuario(idUsuario: number) {
    return this.http.get<OcioNocturno>(`${this.apiUrl}/ocioNocturno/usuario/${idUsuario}`);
  }

  comprobarCodigoOcio(id: number, codigoReserva: any): Observable<any> {
    let codigoReser = {
      codigoReserva: codigoReserva,
      id_ocio: id
    };

    return this.http.post<any>(`${this.apiUrl}/comentario/comprobarCodigoOcioNocturno`, codigoReser)
  }

  enviarValoracionOcio(id: number, codigoReserva: string, experiencia: string, evaluacion: number, id_user: number): Observable<any> {
    let valoracion = {
      codigoReserva: codigoReserva,
      "ocioDTO":
        {"id": id},
      texto: experiencia,
      valoracion: evaluacion,
      clienteDTO:
        {id: id_user}
    };

    return this.http.post<any>(`${this.apiUrl}/comentario/crearOcioNocturno`, valoracion)
  }

  valorcionesPorRestaurante(id: any): Observable<ComentarioOcio[]> {
    return this.http.get<ComentarioOcio[]>(`${this.apiUrl}/comentario/listarValoracionesPorOcio?id=${id}`)
  }

}
