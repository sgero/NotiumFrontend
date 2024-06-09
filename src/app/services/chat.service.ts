import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatMensajeDTO} from "../models/ChatMensajeDTO";

@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private apiUrl = 'http://127.0.0.1:8080/chat';
  constructor(private http: HttpClient) { }

  getMensajesByEvento(id:number){
    return this.http.get<ChatMensajeDTO[]>(`${this.apiUrl}/mensajes/${id}`);
  }

  guardar(dto:ChatMensajeDTO){
    return this.http.post<ChatMensajeDTO>(`${this.apiUrl}/guardar`, dto);
  }

  eliminarMensaje(id:number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
